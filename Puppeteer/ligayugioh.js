import { connect } from 'puppeteer-real-browser';

async function getLigaYugiohData(cardUrl) {

  console.log(cardUrl);

  const { browser, page } = await connect({
    headless: true,

    args: [],
    defaultViewport: false,

    customConfig: {},

    turnstile: true,

    connectOption: {},

    disableXvfb: false,
    ignoreAllFlags: false,
    userDataDir: "./Temp"
    // proxy:{
    //     host:'<proxy-host>',
    //     port:'<proxy-port>',
    //     username:'<proxy-username>',
    //     password:'<proxy-password>'
    // }
  });

  await page.goto(cardUrl, { waitUntil: 'domcontentloaded' });

  await new Promise(r => setTimeout(r, 10000));
  
  
  const minPriceSelector = ".min>.price";
  const mediumPriceSelector = ".medium>.price";
  const maxPriceSelector = ".max>.price";
  const cardNameSelector = ".item-name-en";

  let minPrice = await page.$eval(minPriceSelector, el => el.textContent);
  let mediumPrice = await page.$eval(mediumPriceSelector, el => el.textContent);
  let maxPrice = await page.$eval(maxPriceSelector, el => el.textContent);
  let cardName = await page.$eval(cardNameSelector, el => el.textContent);
  let cardImage = await page.$eval("#featuredImage", el => el.src);

  browser.close();

  return {productName, minPrice, mediumPrice, maxPrice, cardImage};

}

const card = await getLigaYugiohData('https://www.ligayugioh.com.br/?view=cards/card&card=D/D/D%20Zero%20Doom%20Queen%20Machinex');

const card2 = await getLigaYugiohData('https://www.ligayugioh.com.br/?view=cards%2Fcard&card=Florescer+de+Cinzas+%26+Primavera+Feliz&tipo=1');

console.log(card);
console.log(card2);
// module.exports = { getLigaYugiohData };