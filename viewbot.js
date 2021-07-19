const puppeteer = require('puppeteer-core');
const edgePaths = require("edge-paths");
const EDGE_PATH = edgePaths.getEdgePath();
let jsonData = require('./accountinfo.json');

let viewers = 3
let browser = []
for (let x = 0; viewers > x; x++) {

    //console.log("test");
}
loginandfollow(jsonData.data[0], "https://www.twitch.tv/angrymugger")
loginandfollow(jsonData.data[1], "https://www.twitch.tv/angrymugger")
loginandfollow(jsonData.data[2], "https://www.twitch.tv/angrymugger")
async function loginandfollow(cred, url) {
    console.log(cred.login);
    puppeteer.launch({ executablePath: EDGE_PATH, headless: false, args: [`--proxy-server=http://${cred.proxy.ip}:${cred.proxy.port}`] }).then(async browser => {
        //verifyemailOwO(browser)
        jsonData.data[0]
        const page = await browser.newPage();
        await page.authenticate({
            username: cred.proxy.username,
            password: cred.proxy.password,
        });
        await page.goto('https://www.twitch.tv/');
        await delay(4000)
        //clicks login button on twitchy OwO
        await page.click('[data-a-target="login-button"]')
        //NYa :3 enter user/pass
        await delay(500)
        await page.type('[autocomplete="username"]', cred.login)
        await delay(500)
        await page.type('[autocomplete="current-password"]', cred.pass)
        await delay(500)
        await page.click('[data-a-target="passport-login-button"]')
        await delay(1000)
        await page.click('[data-a-target="tw-core-button-label-text"]')
        //data-a-target="tw-core-button-label-text"
        //clicks follow
        await delay(4000)
        await page.goto(url)
        await delay(4000)
        /*if (isfollowed) {
            await page.click('[class="ScCoreButton-sc-1qn4ixc-0 ScCoreButtonText-sc-1qn4ixc-3 ljTPNA"]')
        }
        */
        //await page.type('[data-a-target="chat-input"]', "hello world")
        await delay(30000)
        await page.click('[class="ScSvg-sc-1j5mt50-1 BNeRR"]')
        while (true) {
            //class="ScSvg-sc-1j5mt50-1 BNeRR"
            await page.click('[class="ScSvg-sc-1j5mt50-1 BNeRR"]')
            //sendmsg(page, cred.login)
            console.log("screnshot");
            await page.screenshot({ path: cred.login + '.png' });
            await delay(30000)
        }
    })
}
async function isfollowed() {

}
async function sendmsg(page, msg) {
    await page.type('[data-a-target="chat-input"]', msg)
    await delay(500)
    await page.click('[class="tw-transition"]')
}

function delay(time) {
    time = time + getRandomArbitrary(3000, 15000)
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
