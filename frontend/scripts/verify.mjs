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
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(`console: ${m.text()}`);
});

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });

// 1. Hero after full intro sequence
await sleep(6000);
await page.mouse.move(900, 300); // trigger the "Hey there!" cursor badge
await sleep(1200);
await page.screenshot({ path: '/tmp/v1_hero.png' });

// 2. Mid-transition: shelf steps rising over the sinking hero
await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 0.55 }));
await sleep(800);
await page.screenshot({ path: '/tmp/v2_transition.png' });

// 3. Shelf in place
await page.evaluate(() => document.getElementById('shelf').scrollIntoView());
await page.evaluate(() => window.scrollBy(0, 300));
await sleep(1500);
await page.screenshot({ path: '/tmp/v3_shelf.png' });

// 4. Hover + open a book modal
const book = await page.$('.book-spine');
if (book) {
  const box = await book.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await sleep(600);
  await page.screenshot({ path: '/tmp/v4_book_hover.png' });
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await sleep(1200);
  await page.screenshot({ path: '/tmp/v5_modal.png' });
  await page.keyboard.press('Escape');
  await page.mouse.click(30, 700); // backdrop click closes
  await sleep(800);
}

// 5. Footer reveal (scroll to bottom)
await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight }));
await sleep(1500);
await page.screenshot({ path: '/tmp/v6_footer.png' });

// 6. Menu pill morph
await page.evaluate(() => window.scrollTo({ top: 0 }));
await sleep(800);
const menuBtn = await page.$$eval('button', (btns) => {
  const b = btns.find((x) => x.textContent.includes('Menu'));
  if (b) {
    const r = b.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  }
  return null;
});
if (menuBtn) {
  await page.mouse.click(menuBtn.x, menuBtn.y);
  await sleep(900);
  await page.screenshot({ path: '/tmp/v7_menu.png' });
}

console.log('JS errors:', errors.length ? errors : 'none');
await browser.close();
