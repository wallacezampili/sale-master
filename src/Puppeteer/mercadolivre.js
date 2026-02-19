import puppeteer from "puppeteer";

async function getMercadoLivreData(productUrl) {
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    
    await page.goto(productUrl, { waitUntil: 'domcontentloaded' });

    const priceSelector = '.andes-money-amount__fraction';
    const centsSelector = '.andes-money-amount__cents';
    const productNameSelector = '.ui-pdp-title';
    const imgSelector = '.ui-pdp-image';


    let cents = parseFloat(await page.$$eval(centsSelector, el => el[1].textContent))/100;
    let price = parseFloat(await page.$$eval(priceSelector, el => el[1].textContent)) + cents;
    
    let img = await page.$$(imgSelector)
    img = await page.evaluate(el => el.src, img[1]);

    let productName = await page.$(productNameSelector)
    productName = await page.evaluate(el => el.textContent, productName);

    
    browser.close();
    return {price, img, productName};

}

let a = await getMercadoLivreData('https://www.mercadolivre.com.br/relogio-casual-tomate-mtxp015g-dourado-preto-resistente-agua-30m/p/MLB52766502#polycard_client=search-desktop&search_layout=grid&position=6&type=product&tracking_id=692499e6-5379-4be3-9e58-f4564c8fe18d&wid=MLB4210640877&sid=search')
console.log(a);