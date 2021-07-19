let url = "https://outlook.live.com/owa/"
let emailinput = '[id="MemberName"]'
let next = '[id="iSignupAction"]'
let pass = '[id="PasswordInput"]'
let name1 = '[id="FirstName"]'
let name2 = '[id="LastName"]'
let clikselector = '[id="Country"]'
let clickid = '[id="BirthMonth"]'
let birthinput = '[id="BirthYear"]'

async function gmailsignup(page, credobj) {
    await page.bringToFront()
    await delay(3000)
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
    await delay(10000)
}

