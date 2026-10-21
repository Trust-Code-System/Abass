const { chromium, browserOptions } = require('./browser.cjs');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch(browserOptions);
 const results=[];
 for(const [name,port] of [['dennis',3001],['rishi',3002]]){
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto(`http://127.0.0.1:${port}`,{waitUntil:'networkidle'});await page.waitForTimeout(3500);
  const height=await page.evaluate(()=>document.documentElement.scrollHeight);
  for(let y=0;y<height;y+=700){await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(140);}
  await page.screenshot({path:__dirname+`/${name}-footer.png`});
  const images=await page.locator('img').evaluateAll(imgs=>imgs.map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0})));
  const videos=await page.locator('video').evaluateAll(v=>v.map(x=>({src:x.getAttribute('src'),readyState:x.readyState,error:x.error?.message||null})));
  const routes={};
  if(name==='dennis'){
   await page.getByRole('link',{name:'FABRIC™',exact:false}).scrollIntoViewIfNeeded();await page.getByRole('link',{name:'FABRIC™',exact:false}).hover();await page.waitForTimeout(700);await page.screenshot({path:__dirname+'/dennis-hover.png'});
   for(const path of ['/work','/about','/contact','/fabric'])routes[path]=(await page.request.get(`http://127.0.0.1:${port}${path}`)).status();
  }else{
   await page.evaluate(()=>window.scrollTo(0,0));await page.getByText('Work',{exact:true}).first().click();await page.waitForTimeout(900);routes.workScroll=await page.evaluate(()=>window.scrollY);
   await page.getByText('Download Resume',{exact:true}).scrollIntoViewIfNeeded();await page.getByText('Download Resume',{exact:true}).click();routes.resumeIframeVisible=await page.locator('iframe').isVisible();await page.keyboard.press('Escape');
  }
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(500);
  const mobileWidth=await page.evaluate(()=>({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth}));
  results.push({name,status:response.status(),height,images,videos,routes,mobileWidth,errors});await page.close();
 }
 fs.writeFileSync(__dirname+'/reference-interactions.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
