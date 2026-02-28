const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const allSums = [];
  const urls = [
    'https://sanand0.github.io/tdsdata/js_table/?seed=26',
    'https://sanand0.github.io/tdsdata/js_table/?seed=27',
    'https://sanand0.github.io/tdsdata/js_table/?seed=28',
    'https://sanand0.github.io/tdsdata/js_table/?seed=29',
    'https://sanand0.github.io/tdsdata/js_table/?seed=30',
    'https://sanand0.github.io/tdsdata/js_table/?seed=31',
    'https://sanand0.github.io/tdsdata/js_table/?seed=32',
    'https://sanand0.github.io/tdsdata/js_table/?seed=33',
    'https://sanand0.github.io/tdsdata/js_table/?seed=34',
    'https://sanand0.github.io/tdsdata/js_table/?seed=35'
  ];

  for (const url of urls) {
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('table');  // Wait for dynamic tables to load

    // Find all table cells with numbers
    const numbers = await page.$$eval('table td, table th', cells =>
      cells.flatMap(cell => {
        const text = cell.textContent.trim();
        const num = parseFloat(text);
        return !isNaN(num) ? [num] : [];
      })
    );

    const pageSum = numbers.reduce((acc, n) => acc + n, 0);
    allSums.push(pageSum);
    console.log(`Sum for ${url}: ${pageSum}`);
    await page.close();
  }

  const grandTotal = allSums.reduce((acc, sum) => acc + sum, 0);
  console.log(`GRAND TOTAL SUM: ${grandTotal}`);
  await browser.close();
})();
