const { chromium, browserOptions } = require('./browser.cjs');
const fs = require('fs');
const assert = require('assert/strict');
(async()=>{
 const browser=await chromium.launch(browserOptions);
 const errors=[],badResponses=[],failedRequests=[],navigationAborts=[],checks=[];
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)badResponses.push({url:r.url(),status:r.status()});});
 page.on('requestfailed',r=>{const item={url:r.url(),error:r.failure()?.errorText}; (item.error==='net::ERR_ABORTED'?navigationAborts:failedRequests).push(item);});
 page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 function pass(check){checks.push({check,status:'passed'});console.log('PASS '+check);}
 const response=await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});assert.equal(response.status(),200);
 await page.waitForTimeout(1900); assert.equal(await page.title(),'Abass Ibrahim | Developer & Designer');
 assert.equal(await page.locator('article').count(),4); pass('Page renders Abass identity and four projects');
 await page.screenshot({path:__dirname+'/abass-desktop.png'});
 const pause=page.locator('#home button[aria-pressed]');await pause.click();assert.equal(await pause.getAttribute('aria-pressed'),'true');pass('Marquee pause control');
 await page.getByRole('navigation',{name:'Main navigation',exact:true}).getByRole('link',{name:'About'}).click();await page.waitForTimeout(700);
 assert.equal(new URL(page.url()).hash,'#about');await page.screenshot({path:__dirname+'/abass-about.png'});pass('Desktop anchor navigation');
 await page.getByRole('button',{name:'AI & automation',exact:false}).click();assert.equal(await page.getByRole('button',{name:'AI & automation',exact:false}).getAttribute('aria-pressed'),'true');pass('Circuit practice-area interaction');
 await page.getByRole('button',{name:'View résumé',exact:false}).first().click();
 const resume=page.getByRole('dialog',{name:'Abass Ibrahim / Résumé'});await resume.waitFor({state:'visible'});
 assert.match(await resume.getByRole('link',{name:'Download PDF'}).getAttribute('href'),/Abass_Ibrahim_CV.pdf/);
 await resume.getByRole('button',{name:'Close resume'}).click();assert.equal(await page.locator('dialog[open]').count(),0);pass('Résumé modal opens, exposes PDF download, and closes');
 const menu=page.getByRole('button',{name:'Open navigation'});await menu.click();const navDialog=page.getByRole('dialog',{name:'Navigation',exact:true});await navDialog.waitFor({state:'visible'});
 for(let i=0;i<10;i++){await page.keyboard.press('Tab');assert.ok(await page.evaluate(()=>document.activeElement.closest('dialog')?.id==='navigation-dialog'||document.activeElement===document.body));}
 await page.keyboard.press('Escape');assert.equal(await menu.evaluate(e=>e===document.activeElement),true);pass('Navigation dialog traps focus, Escape closes, focus returns');
 for(let i=0;i<4;i++){await page.locator('article').nth(i).scrollIntoViewIfNeeded();await page.waitForTimeout(350);}
 await page.screenshot({path:__dirname+'/abass-work.png'});pass('All project sections traversed');
 await page.locator('#contact').scrollIntoViewIfNeeded();await page.screenshot({path:__dirname+'/abass-contact.png'});
 assert.equal(await page.getByRole('link',{name:'Get in touch'}).getAttribute('href'),'mailto:abassibrahim591@gmail.com');pass('Contact and social navigation exposed');
 const widths=[320,390,768,1024,1440];
 for(const width of widths){await page.setViewportSize({width,height:width<768?844:1000});await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});await page.waitForTimeout(1850);
   const size=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert.ok(size.scroll<=size.width,JSON.stringify(size));
   const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src));assert.deepEqual(broken,[]);
   for(const id of ['about','work','contact']){await page.locator('#'+id).scrollIntoViewIfNeeded(); const s=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert.ok(s.scroll<=s.width,`Overflow at ${width} / ${id}`);}
   await page.evaluate(()=>window.scrollTo(0,0));
   if(width===390||width===768)await page.screenshot({path:__dirname+`/abass-${width===390?'mobile':'tablet'}.png`});
   pass(`No horizontal overflow or broken loaded images at ${width}px`);
 }
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});await page.waitForTimeout(1800);
 await page.getByRole('button',{name:'Open navigation'}).click();await page.getByRole('navigation',{name:'Expanded navigation'}).getByRole('link',{name:'Work'}).click();assert.equal(await page.locator('dialog[open]').count(),0);assert.equal(new URL(page.url()).hash,'#work');pass('Mobile menu navigation closes and reaches target');
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});await page.waitForTimeout(400);
 assert.equal(await page.locator('[data-reduced="true"]').count(),4);
 const anims=await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length);assert.equal(anims,0);pass('Reduced motion removes continuous animations and sticky card scaling');
 const keyboardPage=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});await keyboardPage.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});await keyboardPage.keyboard.press('Tab');assert.equal(await keyboardPage.evaluate(()=>document.activeElement.textContent),'Skip to content');await keyboardPage.keyboard.press('Enter');assert.equal(await keyboardPage.evaluate(()=>document.activeElement.id),'main-content');pass('Keyboard skip link reaches main content');
 const pdf=await page.request.get('http://127.0.0.1:3000/Abass_Ibrahim_CV.pdf');assert.equal(pdf.status(),200);assert.equal((await pdf.body()).subarray(0,4).toString(),'%PDF');pass('Résumé PDF request returns PDF data');
 for(const asset of ['/images/abass.png','/images/thesis.svg','/images/helping-tribe.svg','/images/wearables.svg','/images/atlas.svg','/icon.svg']){assert.equal((await page.request.get('http://127.0.0.1:3000'+asset)).status(),200);}
 pass('All portfolio source images and favicon load');
 const og=await page.request.get('http://127.0.0.1:3000/opengraph-image');assert.equal(og.status(),200);pass('Social image route renders');
 assert.deepEqual(errors,[]);assert.deepEqual(badResponses,[]);assert.deepEqual(failedRequests,[]);pass('No browser JavaScript errors, failed requests, or HTTP asset errors');
 fs.writeFileSync(__dirname+'/portfolio-verification.json',JSON.stringify({checks,errors,badResponses,failedRequests,navigationAborts},null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
