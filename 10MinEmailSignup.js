const $ = require('cheerio');
const random_name = require('node-random-name');
var generator = require('generate-password');
const puppeteer = require('puppeteer-extra')
const chromePaths = require('chrome-paths');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
var UserAgent = require('user-agents');
const axios = require('axios');
const controller = require('./controller')
const CircularJSON = require('circular-json');
const { del } = require('request');
let readytogo = true;
//const account = require('./model')
/*

8806016a8a2554897.9257670105|r=eu-west-1|metabgclr=transparent|guitextcolor=%23000000|metaiconclr=%23757575|meta=3|lang=en|pk=E5554D43-23CC-1982-971D-6A2262A2CA24|at=40|atp=2
|cdn_url=https://cdn.arkoselabs.com/fc|lurl=https://audio-eu-west-1.arkoselabs.com|surl=https://client-api.arkoselabs.com



    todo#
        init function with array of browser and loop from db that give state and read url and state from db
        0 = go idle 1 =  go to stream
     
*/



puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin({ blockTrackers: false }))
function delay(time) {
    time = time + getRandomArbitrary(1000, 9000)
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

//C:\Program Files\Google\Chrome\Application\chrome.exe
async function startscrape1() {
    let proxylist = await controller.getproxies();
    let proxyid = Math.floor(Math.random() * (6 - 1) + 1);
    let cred = proxylist.find(element => element.id == proxyid);
    //`--proxy-server=http://${proxyobj.ip}:${proxyobj.port}`,
    puppeteer.launch({ executablePath: "google-chrome", headless: true, args: [`--proxy-server=http://${cred.ip}`, '--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'] }).then(async browser => {

        //verifyemailOwO(browser)
        //loginandfollow(browser)
        let twitchpage = await browser.newPage();
        await twitchpage.evaluateOnNewDocument(() => {
            window.navigator = {}
        })
        await twitchpage.authenticate({
            username: cred.user,
            password: cred.pass,
        });
        let mailpage = await browser.newPage();
        await mailpage.authenticate({
            username: cred.user,
            password: cred.pass,
        });
        await twitchpage.setViewport({ width: 1920, height: 1080 })
        await mailpage.setViewport({ width: 1920, height: 1080 })
        signup(twitchpage, mailpage, proxyid)
        await delay(2000);
        readytogo = true
        await browser.close()

    })
}
//get email adress
// go and input to twitch. click verify email
//add to database
async function signup(tpage, mpage, proxy) {
    await mpage.bringToFront()
    //await page.goto("https://www.minuteinbox.com/delete");
    await mpage.goto("https://www.minuteinbox.com/");
    //await page.click('[class="hidden-xs hidden-sm klikaciRadek newMail"]')
    await delay(1000)
    let signupdata = getsignupdata(await mpage.content())
    await entertwitchcreds(tpage, signupdata)
    await delay(1000)
    let creds = getFunCapdata(await tpage.content())
    let apikey = "64eb2950300dd1e594d24cd4a96ef79d"
    let url = "https://2captcha.com/in.php?key=" + apikey + "&method=funcaptcha&publickey=" + creds.pk + "&surl=" + creds.surl + "&pageurl=https://www.twitch.tv/" + '&json=1'
    let captkey
    let loop = true
    /*while(loop){
        const response = await axios.get(url);
        if(response.data.request){
            captkey = response.data.request
            console.log(typeof(response.data.request));
            var currentPageNo 
            currentPageNo = getFunCapdata1(await tpage.content(),response.data.request)
            console.log("currentpagenr" + currentPageNo);
            await tpage.$eval(
              '#FunCaptcha-Token',
              (e, no) => e.setAttribute("value", no),
              currentPageNo
            );
            loop = false
        }

        await delay(15000)
    }
    */

    await verifyemail(mpage)
    let storeobj = { "login": signupdata.name, "pass": signupdata.password, followed: false, proxy: proxy }
    controller.pushstoredata(storeobj)
    //register and iput on twitch
    //confirm email
    //class="hidden-xs hidden-sm klikaciRadek newMail"
}

function getFunCapdata1(url, Token) {
    let capCred
    //console.log(url);
    $('#FunCaptcha-Token', url).each(function () {
        let respons = $(this).val().split("|")
        respons[0] = Token
        capCred = respons.join("|")
    })
    return capCred
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
    await delay(5000)
    const content = await frame.content();
    const $$ = $.load(content);
    const p = $$('a').attr();
    console.log(p.href)
    await page.goto(p.href)
}

function getFunCapdata(url) {
    let capCred = { pk: "", surl: "" }
    //console.log(url);
    $('#FunCaptcha-Token', url).each(function () {
        let respons = $(this).val().split("|")
        console.table(respons)    // |
        let key = respons[7].replace("pk=", "")
        let url = respons[12].replace("surl=", "")
        capCred.pk = key
        capCred.surl = url
        console.log(key);
    })
    return capCred
}






//'[id="email-input"]'
async function entertwitchcreds(page, credobj) {
    await page.bringToFront()
    await delay(1000)
    await page.goto('https://www.twitch.tv/');
    await delay(500)
    await page.click('[data-a-target="signup-button"]')
    await delay(5000)
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
    await delay(2000)
    await page.screenshot({ path: credobj.name + ".png" });


}
async function asd() {
    let instances = 2
    for (let x = 1; instances >= x; x++) {
        startscrape1(x)
        while (readytogo == false) {
            await delay(50)
        }
    }
}
asd();