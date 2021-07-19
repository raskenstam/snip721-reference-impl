const puppeteer = require('puppeteer-core');
const edgePaths = require("edge-paths");
const EDGE_PATH = edgePaths.getEdgePath();
let jsonData = require('./accountinfo.json');



puppeteer.launch({ executablePath: EDGE_PATH, headless: false }).then(async browser => {
    let cred = {
        firstName: "stennn",
        lastName: "henriksson",
        username: "123asd123fsd",
        Passwd: "zb3789fcp"
    }
    let page = await browser.newPage();
    gmailsignup(page, cred)
})

function delay(time) {
    time = time + getRandomArbitrary(3000, 15000)
    time = 600
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
async function gmailsignup(page, credobj) {
    await page.bringToFront()
    await delay(3000)
    let url = "https://accounts.google.com/SignUp?hl=nn"
    await page.goto(url);
    await delay(1000)
    await page.type('[id="firstName"]', credobj.firstName)
    await delay(500)
    await page.type('[id="lastName"]', credobj.lastName)
    await delay(500)
    await page.type('[id="username"]', credobj.username)
    await delay(500)
    await page.type('[name="Passwd"]', credobj.Passwd)
    await delay(500)
    await page.type('[name="ConfirmPasswd"]', credobj.Passwd)
    await delay(500)
    await page.click('[id="accountDetailsNext"]')
    await delay(500)
    await page.type('[id="day"]', "1")
    await page.click('[id="month"]')
    await delay(500)
    await page.keyboard.press('ArrowDown');
    await page.type('[id="year"]', "1996")
    await page.click('[id="gender"]')
    await delay(500)
    await page.keyboard.press('ArrowDown');
    await page.click('[class="VfPpkd-vQzf8d"]')
    await delay(500)
    await page.click('[id="selectionc4"]')
    await delay(500)
    await page.click('[class="VfPpkd-vQzf8d"]')
    await delay(500)
    await page.click('[class="VfPpkd-vQzf8d"]')
    await delay(500)
    await page.click('[class="VfPpkd-vQzf8d"]')
    //id="selectionc4"
    await delay(10000)
}