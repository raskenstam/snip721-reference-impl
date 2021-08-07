const puppeteer = require('puppeteer');
const url = "https://www.toptal.com/puppeteer/headless-browser-puppeteer-tutorial";
if (!url) {
    throw "Please provide URL as a first argument";
}
async function init() {
    let browserarr = []
    for (let x = 0; 4 >= x; x++) {
        const browser = await puppeteer.launch({ executablePath: "google-chrome", headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'] })
        const page1 = await browser.newPage();
        const page2 = await browser.newPage();
        let obj = { browser: browser, page1: page1, page2: page2 }
        browserarr.push(obj)
        dostuff(browserarr[x].browser, browserarr[x].page1, browserarr[x].page2, x)
        //controller get and start 2 for each index
    }
}
async function dostuff(browser, page1, page2, x) {
    await page1.goto(url);
    await page1.screenshot({ path: 'screenshot' + x + '.png' });
    browser.close();
}
init();