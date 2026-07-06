import puppeteer from 'puppeteer-core';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1366, height: 768 });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
await sleep(5500);

const shots = [
  ['s1_podium_mid', 0.5],   // statement steps rising over hero
  ['s2_statement', 1.35],   // statement text
  ['s3_brush_edge', 2.15],  // black -> cream brush edge
  ['s4_shelf', 2.8],        // cream shelf
];
for (const [name, vh] of shots) {
  await page.evaluate((y) => window.scrollTo({ top: window.innerHeight * y, behavior: 'instant' }), vh);
  await sleep(1200);
  await page.screenshot({ path: `/tmp/${name}.png` });
}
// bottom: reverse podium lifting off the footer
await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight - window.innerHeight * 1.55, behavior: 'instant' }));
await sleep(1000);
await page.screenshot({ path: '/tmp/s5_footer_edge.png' });
console.log('JS errors:', errors.length ? errors : 'none');
await browser.close();
