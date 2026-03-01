const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  let grandTotal = 0;

  for (let seed = 51; seed <= 60; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);
    
    // Wait for the table to render if it's dynamic
    await page.waitForSelector('table');

    const sum = await page.$$eval('td', cells => {
      return cells
        .map(cell => parseFloat(cell.innerText))
        .filter(num => !isNaN(num))
        .reduce((acc, num) => acc + num, 0);
    });

    console.log(`Seed ${seed} Sum: ${sum}`);
    grandTotal += sum;
  }

  console.log(`FINAL TOTAL: ${grandTotal}`);
  await browser.close();
})();
