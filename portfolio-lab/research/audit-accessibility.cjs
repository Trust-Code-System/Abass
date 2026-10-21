const { chromium, browserOptions } = require('./browser.cjs');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch(browserOptions);
 const results=[];
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
  await page.addScriptTag({path:__dirname+'/qa-tools/node_modules/axe-core/axe.min.js'});
  for(const state of ['page','navigation','resume']){
   if(state==='navigation'){if(width===1440)await page.locator('#about').scrollIntoViewIfNeeded();await page.getByRole('button',{name:'Open navigation'}).click();}
   if(state==='resume'){await page.keyboard.press('Escape');await page.locator('#about').scrollIntoViewIfNeeded();await page.getByRole('button',{name:'View résumé',exact:false}).first().click();}
   const report=await page.evaluate(async()=>await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
   results.push({width,state,violations:report.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:report.incomplete.map(v=>v.id),passes:report.passes.length});
  }
  await page.close();
 }
 fs.writeFileSync(__dirname+'/accessibility-results.json',JSON.stringify(results,null,2));
 console.log(JSON.stringify(results,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
