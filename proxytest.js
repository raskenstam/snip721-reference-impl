const puppeteer = require('puppeteer');
const edgePaths = require("edge-paths");

const PROXY_SERVER_IP = '161.123.31.149';
const PROXY_SERVER_PORT = '36246';
const PROXY_USERNAME = 'proxyfish290';
const PROXY_PASSWORD = 'hnbfrxth';
let proxyobj = {
    ip: '161.123.31.149',
    port: '36246',
    username: 'proxyfish290',
    password: 'hnbfrxth',
}
    (async () => {
        const browser = await puppeteer.launch({
            args: [`--proxy-server=http://${proxyobj.ip}:${proxyobj.port}`],
            headless: false
        });
        const page = await browser.newPage();

        await page.authenticate({
            username: proxyobj.username,
            password: proxyobj.password,
        });

        await page.goto('https://www.google.ca/', {
            timeout: 0,
        });
    })();