//TODO  SIGN UP WITH PROXY AND SAVED TO MYSQL
//TODO LOGIN AND DATA RECON
const $ = require('cheerio');
const random_name = require('node-random-name');
var generator = require('generate-password');
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
const controller = require('./controller')
puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin({ blockTrackers: false }))
const capatchatime = 2000
const edgePaths = require("edge-paths");
const EDGE_PATH = edgePaths.getEdgePath();
function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}
let proxyobj = {
    ip: '161.123.31.149',
    port: '36246',
    username: 'proxyfish290',
    password: 'hnbfrxth',
}
//C:\Program Files\Google\Chrome\Application\chrome.exe
async function startscrape1() {

    puppeteer.launch({ executablePath: EDGE_PATH, headless: false, args: [`--proxy-server=http://${proxyobj.ip}:${proxyobj.port}`, '--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'] }).then(async browser => {

        //verifyemailOwO(browser)
        //loginandfollow(browser)
        let twitchpage = await browser.newPage();
        await twitchpage.evaluateOnNewDocument(() => {
            window.navigator = {}
        })
        let mailpage = await browser.newPage();
        await mailpage.authenticate({
            username: proxyobj.username,
            password: proxyobj.password,
        });
        await twitchpage.setViewport({ width: 1920, height: 1080 })
        await mailpage.setViewport({ width: 1920, height: 1080 })
        signup(twitchpage, mailpage)

    })
}
//get email adress
// go and input to twitch. click verify email
//add to database
async function signup(tpage, mpage) {
    await mpage.bringToFront()
    //await page.goto("https://www.minuteinbox.com/delete");
    await mpage.goto("https://www.minuteinbox.com/");
    //await page.click('[class="hidden-xs hidden-sm klikaciRadek newMail"]')
    await delay(1000)
    let signupdata = getsignupdata(await mpage.content())
    await entertwitchcreds(tpage, signupdata)
    await delay(1000)
    await verifyemail(mpage)
    let storeobj = { "login": signupdata.name, "pass": signupdata.password, followed: false, proxy: proxyobj }
    controller.pushstoredata(storeobj)
}
function getsignupdata(url) {
    let email1
    $('span', url).each(function () {
        if ($(this).attr().id == "email") {
            email1 = $(this).text()
        }
    })
    let name = random_name({ random: Math.random, female: true }) + random_name({ random: Math.random, female: true }) + random_name({ random: Math.random, female: true })
    let pass = generator.generate({
        length: 10,
        numbers: true
    });
    return { password: pass, email: email1, name: name }
}
async function verifyemail(page) {
    await delay(5000)
    await page.bringToFront()
    await page.goto('https://www.minuteinbox.com/window/id/2');
    console.log("before w8");
    await delay(5000)
    console.log("after w8");
    let url = await page.content()
    const frame = page.frames().find(frame => frame.name() == 'iframeMail');
    const content = await frame.content();
    const $$ = $.load(content);
    const p = $$('a').attr();
    console.log(p.href)
    await page.goto(p.href)
}
//'[id="email-input"]'
async function entertwitchcreds(page, credobj) {
    await page.bringToFront()
    await delay(1000)
    await page.goto('https://www.twitch.tv/');
    await delay(500)
    await page.click('[data-a-target="signup-button"]')
    await delay(500)
    await page.type('[id="signup-username"]', credobj.name)
    await delay(500)
    await page.type('[id="password-input"]', credobj.password)
    await delay(500)
    await page.type('[id="password-input-confirmation"]', credobj.password)
    await delay(500)
    await page.click('[data-a-target="birthday-month-select"]')
    await delay(500)
    await page.keyboard.press('ArrowDown');
    await delay(500)
    await page.type('[placeholder="Day"]', "1")
    await delay(500)
    await page.type('[placeholder="Year"]', "1999")
    await delay(500)
    await page.type('[id="email-input"]', credobj.email)
    await delay(1000)
    await page.click('[data-a-target="passport-signup-button"]')
    await delay(capatchatime)


}
startscrape1()
