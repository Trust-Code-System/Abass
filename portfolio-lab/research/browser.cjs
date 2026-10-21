const fs = require('fs');
let playwright;
try { playwright = require('./qa-tools/node_modules/playwright'); }
catch { playwright = require('/opt/codex/cua_node/lib/node_modules/playwright'); }
const browserOptions = { headless: true };
if (process.platform === 'linux' && fs.existsSync('/usr/bin/chromium')) {
  browserOptions.executablePath = '/usr/bin/chromium';
  browserOptions.args = ['--no-sandbox']; // Required by this cloud container's process isolation.
}
module.exports = { chromium: playwright.chromium, browserOptions };
