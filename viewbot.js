/*
TODO controller setup to get and change if followed
    get list of all acounts with proxy id and get 2 for each proxy 
TODO controller get 2 for each proxy adress
*/
const puppeteer = require('puppeteer-core');
const controller = require('./controller')
//1 viewer = 2
let viewers = 1
let url = "https://www.twitch.tv/stenstensten1"
async function start() {
    for (let x = 1; viewers >= x; x++) {
        console.log(x)
        //controller get and start 2 for each index
        let proxy = await controller.getproxiesPrimaryKey(x)
        let account = await controller.getProxiesAccount(x)
        loginandfollow(account[6], url, proxy)
    }

}
async function start() {
    for (let x = 1; viewers >= x; x++) {
        console.log(x)
        let proxylist = await controller.getproxies();
        let proxyid = Math.floor(Math.random() * (6 - 1) + 1);
        let cred = proxylist.find(element => element.id == proxyid);
        let account = await controller.getProxiesAccount(x)
        loginandfollow(account[0], url, cred)
    }

}
start();
async function loginandfollow(cred, url, proxy) {
    console.log(proxy);
    puppeteer.launch({ executablePath: "google-chrome", headless: false, args: [`--proxy-server=http://${proxy.ip}`, '--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'] }).then(async browser => {

        //verifyemailOwO(browser)
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768 })
        await page.authenticate({
            username: proxy.user,
            password: proxy.pass,
        });
        await page.goto('https://www.twitch.tv/');
        await delay(4000)
        //clicks login button on twitchy OwO
        await page.click('[data-a-target="login-button"]')
        //NYa :3 enter user/pass
        await delay(500)
        await page.type('[autocomplete="username"]', cred.name)
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
