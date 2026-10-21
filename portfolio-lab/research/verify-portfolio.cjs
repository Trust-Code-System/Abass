const { chromium, browserOptions } = require('./browser.cjs');
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const base = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:3000';
const evidence = process.env.PORTFOLIO_EVIDENCE_DIR || __dirname;
const intro = 'main > div[aria-hidden="true"] bdi[lang]';
(async () => {
 const browser = await chromium.launch(browserOptions);
 const checks=[], errors=[], badResponses=[], introRuns=[];
 fs.mkdirSync(evidence,{recursive:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});
 context.setDefaultTimeout(10000);
 context.setDefaultNavigationTimeout(15000);
 await context.addInitScript(() => {
  window.__introTrace={words:[],finishedAt:null};
  const observer=new MutationObserver(() => {
   const word=document.querySelector('main > div[aria-hidden="true"] bdi[lang]'), trace=window.__introTrace;
   if(word && trace.words.at(-1)?.text!==word.textContent) {
    const box=word.getBoundingClientRect();
    trace.words.push({text:word.textContent,lang:word.lang,visible:box.width>0&&box.height>0,fits:box.left>=0&&box.right<=innerWidth,at:performance.now()});
   } else if(!word&&trace.words.length) {trace.finishedAt=performance.now();observer.disconnect();}
  });
  observer.observe(document,{childList:true,subtree:true,characterData:true});
 });
 const page=await context.newPage();
 page.on('pageerror',error=>errors.push(error.message));
 page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
 page.on('response',response=>{if(response.status()>=400)badResponses.push({url:response.url(),status:response.status()});});
 const pass=check=>{checks.push(check);console.log('PASS '+check);};
 const home=async()=>{assert.equal((await page.goto(base,{waitUntil:'networkidle'})).status(),200);await page.locator(intro).waitFor({state:'detached',timeout:10000});};
 for(const width of [320,390,768,1024,1440]) {
  await page.setViewportSize({width,height:width<768?844:1000});await home();
  const trace=await page.evaluate(()=>window.__introTrace);
  assert.deepEqual(trace.words.map(word=>word.lang),['en','fr','es','it','pt','de','ja','ko','zh','ar']);
  assert.ok(trace.words.every(word=>word.visible&&word.fits));
  assert.ok(trace.finishedAt>trace.words.at(-1).at+350);introRuns.push({width,...trace});
  assert.equal(await page.locator('article').count(),4);assert.equal(await page.locator('iframe,embed,object').count(),0);
  for(const id of ['home','about','work','contact']){await page.locator('#'+id).scrollIntoViewIfNeeded();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Home overflow at '+width+'/'+id);}
  await page.goto(base+'/about',{waitUntil:'networkidle'});
  assert.equal(await page.locator('iframe,embed,object').count(),0);
  assert.equal(await page.locator('#expertise article').count(),3);assert.equal(await page.locator('#experience ol > li').count(),4);
  assert.equal(await page.locator('main a[download]').count(),2);
  for(const id of ['story','expertise','experience','toolkit','contact']){await page.locator('#'+id).scrollIntoViewIfNeeded();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'About overflow at '+width+'/'+id);}
  assert.deepEqual(await page.locator('img').evaluateAll(images=>images.filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)),[]);
  await page.evaluate(()=>scrollTo(0,0));
  if([390,768,1440].includes(width))await page.screenshot({path:path.join(evidence,'profile-'+width+'.png')});
  pass('Ten greetings, native About content, assets, and overflow at '+width+'px');
 }
 const downloadPromise=page.waitForEvent('download');await page.getByRole('link',{name:'Download CV PDF',exact:true}).click();
 const download=await downloadPromise;assert.match(download.suggestedFilename(),/\.pdf$/i);assert.equal(fs.readFileSync(await download.path()).subarray(0,4).toString(),'%PDF');
 pass('Corner CV control downloads a real PDF');
 await page.getByRole('navigation',{name:'Main navigation',exact:true}).getByRole('link',{name:'Work',exact:true}).click();
 await page.waitForURL('**/#work');await page.locator(intro).waitFor({state:'detached',timeout:10000});
 await page.locator('#about').scrollIntoViewIfNeeded();await page.getByRole('button',{name:'AI & automation',exact:false}).click();
 assert.equal(await page.getByRole('button',{name:'AI & automation',exact:false}).getAttribute('aria-pressed'),'true');
 await page.locator('#home').scrollIntoViewIfNeeded();await page.getByRole('button',{name:'Pause name animation',exact:true}).click();
 assert.equal(await page.getByRole('button',{name:'Play name animation',exact:true}).getAttribute('aria-pressed'),'true');
 pass('Cross-page Work navigation, practice selector, and marquee pause');
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Open navigation'}).click();
 for(let i=0;i<12;i++){await page.keyboard.press('Tab');assert.ok(await page.evaluate(()=>!!document.activeElement.closest('dialog')||document.activeElement===document.body));}
 await page.keyboard.press('Escape');assert.equal(await page.getByRole('button',{name:'Open navigation'}).evaluate(el=>el===document.activeElement),true);
 await page.getByRole('button',{name:'Open navigation'}).click();await page.getByRole('navigation',{name:'Expanded navigation'}).getByRole('link',{name:'About',exact:false}).click();
 await page.waitForURL('**/about');assert.equal(await page.locator('dialog[open]').count(),0);
 pass('Mobile menu focus, Escape, focus return, and About route');
 await page.emulateMedia({reducedMotion:'reduce'});await home();
 assert.ok((await page.evaluate(()=>window.__introTrace.words)).every(word=>!word.visible));
 assert.equal(await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length),0);
 assert.equal(await page.locator('[data-reduced="true"]').count(),4);pass('Reduced motion bypasses the intro and continuous animation');
 await page.goto(base+'/about',{waitUntil:'networkidle'});await page.keyboard.press('Tab');
 assert.equal(await page.evaluate(()=>document.activeElement.textContent),'Skip to content');await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'main-content');
 await page.emulateMedia({forcedColors:'active',reducedMotion:'reduce'});assert.ok(await page.getByRole('link',{name:'Download CV PDF',exact:true}).isVisible());pass('About keyboard skip link and forced-colors download visibility');
 for(const asset of ['/Abass_Ibrahim_CV.pdf','/images/abass.png','/images/thesis.svg','/images/helping-tribe.svg','/images/wearables.svg','/images/atlas.svg','/icon.svg','/opengraph-image'])assert.equal((await page.request.get(base+asset)).status(),200,asset);
 assert.deepEqual(errors,[]);assert.deepEqual(badResponses,[]);pass('Source assets, PDF, social image, and clean JavaScript/HTTP responses');
 fs.writeFileSync(path.join(evidence,'portfolio-verification.json'),JSON.stringify({base,browser:process.env.PORTFOLIO_BROWSER_CHANNEL||'chromium',checks,introRuns,errors,badResponses},null,2));
 await browser.close();
})().catch(error=>{console.error(error);process.exit(1);});
