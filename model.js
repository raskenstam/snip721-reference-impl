const $ = require('cheerio');
const user = "stenstensten1"
const pass = "zb3789fcp"
const random_name = require('node-random-name');
const loginarray = []
var generator = require('generate-password');
let baseurl = "https://www.twitch.tv/"
/*
    todo#
        f_login 
        f_go to channel
     f_collect reward
     f_spend reward
     f_send in chat
     m_getPrefs
     m_login pass and email
     m_
*/
const puppeteer = require('puppeteer-core');
const edgePaths = require("edge-paths");
const EDGE_PATH = edgePaths.getEdgePath();
function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}
//C:\Program Files\Google\Chrome\Application\chrome.exe
async function startscrape1() {

    puppeteer.launch({ executablePath: EDGE_PATH, headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] }).then(async browser => {

        //verifyemailOwO(browser)
        //loginandfollow(browser)
        let placeholderobj = { password: "zb3789fcp", email: "gifesa5294@alicdh.com", name: "storsten69420" }
        let twitchpage = await browser.newPage();
        let mailpage = await browser.newPage();

        signup(twitchpage, mailpage, placeholderobj)

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
    entertwitchcreds(tpage, signupdata)
    //register and iput on twitch
    //confirm email
    //class="hidden-xs hidden-sm klikaciRadek newMail"
}
function getsignupdata(url) {
    let email1 = $('span', url).each(function () {
        if ($(this).attr().id == "email") {
            return $(this).text()
        }
    })
    let name = random_name({ random: Math.random, female: true }) + random_name({ random: Math.random, female: true }) + random_name({ random: Math.random, female: true })
    let pass = generator.generate({
        length: 10,
        numbers: true
    });
    return { password: pass, email: email1, name: name }
}

async function loginandfollow(browser) {
    const page = await browser.newPage();
    await page.goto('https://www.twitch.tv/cashapp');
    await delay(4000)
    //clicks login button on twitchy OwO
    await page.click('[data-a-target="login-button"]')
    //NYa :3 enter user/pass
    await delay(500)
    await page.type('[autocomplete="username"]', user)
    await delay(500)
    await page.type('[autocomplete="current-password"]', pass)
    await delay(500)
    await page.click('[data-a-target="passport-login-button"]')
    await page.screenshot({ path: 'example.png' });
    //clicks follow
    await delay(4000)
    await page.click('[data-a-target="follow-button"]')
}
//'[id="email-input"]'
async function entertwitchcreds(page, credobj) {
    console.table(credobj);
    await page.bringToFront()
    await page.goto('https://www.twitch.tv/cashapp');
    await delay(500)
    await page.click('[data-a-target="signup-button"]')
    await delay(500)
    await page.type('[id="signup-username"]', credobj.name)
    await page.type('[id="password-input"]', credobj.password)
    await page.type('[id="password-input-confirmation"]', credobj.password)
    await page.click('[data-a-target="birthday-month-select"]')
    await page.keyboard.press('ArrowDown');
    await page.type('[placeholder="Day"]', "1")
    await page.type('[placeholder="Year"]', "1999")
    console.log(credobj.email);
    await page.type('[id="email-input"]', credobj.email)
    await page.click('[data-a-target="passport-signup-button"]')
}
startscrape1()
