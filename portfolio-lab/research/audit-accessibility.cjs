const { chromium, browserOptions } = require('./browser.cjs');
const fs=require('fs');
const path=require('path');
const base=process.env.PORTFOLIO_BASE_URL||'http://127.0.0.1:3000';
const evidence=process.env.PORTFOLIO_EVIDENCE_DIR||__dirname;
(async()=>{
 const browser=await chromium.launch(browserOptions);
 const results=[];
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  await page.goto(base,{waitUntil:'networkidle'});
  await page.addScriptTag({path:__dirname+'/qa-tools/node_modules/axe-core/axe.min.js'});
  for(const state of ['page','navigation','about','guide','guide-hidden']){
   if(state==='navigation'){if(width===1440)await page.locator('#about').scrollIntoViewIfNeeded();await page.getByRole('button',{name:'Open navigation'}).click();}
   if(state==='about'){await page.keyboard.press('Escape');await page.goto(base+'/about',{waitUntil:'networkidle'});await page.addScriptTag({path:__dirname+'/qa-tools/node_modules/axe-core/axe.min.js'});}
   if(state==='guide'){await page.getByRole('button',{name:'Open Byte site guide',exact:true}).click();}
   if(state==='guide-hidden'){await page.getByRole('button',{name:'Hide companion',exact:true}).click();}
   const report=await page.evaluate(async()=>await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
   results.push({width,state,violations:report.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:report.incomplete.map(v=>v.id),passes:report.passes.length});
  }
  await page.close();
 }
 fs.mkdirSync(evidence,{recursive:true});
 fs.writeFileSync(path.join(evidence,'accessibility-results.json'),JSON.stringify(results,null,2));
 console.log(JSON.stringify(results,null,2));await browser.close();
 if(results.some(result=>result.violations.length))process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1);});
