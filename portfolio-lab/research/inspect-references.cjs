const { chromium, browserOptions } = require('./browser.cjs');
const fs = require('fs');
(async () => {
 const browser = await chromium.launch(browserOptions);
 const results=[];
 for(const [name,port] of [['rishi',3002],['dennis',3001]]){
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  try {
   const response=await page.goto(`http://127.0.0.1:${port}`,{waitUntil:'networkidle',timeout:90000});
   await page.waitForTimeout(3500);
   await page.screenshot({path:`/workspace/portfolio-lab/research/${name}-desktop.png`});
   const headings=await page.locator('h1,h2,h3').allTextContents();
   const text=(await page.locator('body').innerText()).slice(0,2000);
   const overflow=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth,scrollHeight:document.documentElement.scrollHeight}));
   await page.evaluate(()=>window.scrollTo(0,innerHeight)); await page.waitForTimeout(1200);
   await page.screenshot({path:`/workspace/portfolio-lab/research/${name}-section.png`});
   await page.setViewportSize({width:390,height:844}); await page.evaluate(()=>window.scrollTo(0,0)); await page.waitForTimeout(1000);
   await page.screenshot({path:`/workspace/portfolio-lab/research/${name}-mobile.png`});
   results.push({name,status:response.status(),headings,text,overflow,errors});
  }catch(e){results.push({name,error:e.message,errors});}
  await page.close();
 }
 fs.writeFileSync(__dirname+'/reference-inspection.json',JSON.stringify(results,null,2));
 console.log(JSON.stringify(results,null,2)); await browser.close();
})();
