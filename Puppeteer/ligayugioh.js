const puppeteer = require('puppeteer');

async function getLigaYugiohData(cardUrl){
    const browser = puppeteer.launch({ headless: true });
    const page = await browser.newPage();
}   