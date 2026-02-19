import puppeteer from "puppeteer";

async function getAmazonData(url) {
    
    const browser = await puppeteer.launch({ headless: false, userDataDir: "./Temp"});
    const page = await browser.newPage();
    
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    

    const priceSelector = '.a-price-whole';
    const centsSelector = '.a-price-fraction';
    const productNameSelector = '#productTitle';
    const imgSelector = '#landingImage';

    let cents = parseFloat(await page.$eval(centsSelector, el => el.textContent))/100;
    let price = parseFloat(await page.$eval(priceSelector, el => el.textContent)) + cents;
    let img = await page.$eval(imgSelector, el => el.src);
    let productName = await page.$eval(productNameSelector, el => el.textContent.trim());
    
    browser.close();

    return {productName, price, img};


}


let a = await getAmazonData('https://www.amazon.com.br/Casas-estranhas-Vol/dp/8551013130/ref=sr_1_1?crid=3MIIJVAQ2QATF&dib=eyJ2IjoiMSJ9.d3d58jkDPzoMx9Jgie2Mj6AHz3kchkt4s0dkBL4NGN7VVAu8VAZ8wByEoGvvhNLelsZcaFIWJekPhlO_K8bzz5l2BggJqx2wFQ0p1WtjoCT0iDEz49sV6itPeeD4J_VmSfE4mtWmJpKs53EA0nAoVciLYat8NnLWoRZPGClgIha-6Q5ZdUxhUHrwjaCrgG6Ohsq5bwdFtKlawdTPfsU7Xk6k8xmONFm70OcWWFnAUysTEJkrG9EYmfgz5LHRBqzOAJ7zjuXTv_BZUST0_-Lqrtii8O4ufZqbinN2jvpatco.AC_tTdUO0KG-X2LPv-uYBkpUHVXyBIZIWxzHqXusz4o&dib_tag=se&keywords=casas+estranhas&qid=1770290810&sprefix=casas+%2Caps%2C202&sr=8-1')
console.log(a);
let b = await getAmazonData('https://www.amazon.com.br/PLACA-VIDEO-ASUS-RADEON-GDDR6/dp/B0DKPGQT97/ref=sr_1_1?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2QP2EML0OLRF6&dib=eyJ2IjoiMSJ9.oivPH3JFQibjl2KZbjViIcIJ_19htBQeX3SxwY1eG7kJki2QozlvqeXIvbm-CdwWuyFtxQaqD4bVC1SpstOoudlF4VVBG08JqOqSbAKOCJ64TSI3erFxKJwsASfwyUS-TkMOUQbWpyUArdmrAuFik8d7D9FUJ2WYFsKe6U4IxU84PZC9itSoWVNrGnfnhQT--8T05fWH0RM6EDLqtEjuyInz-UlEjOdU-FhbzHeiQmRmeb4Wh50A8zLnW6gR3zEMBSfqhb-IeAcMOzyyrodMdjBQ_4N1u2qVqE9G0nRgm-Y.U1pO_4sYFiPyslic97WWie-uUQQm4_J6dnrdKEBbx-M&dib_tag=se&keywords=rx+7600&qid=1770290851&sprefix=rx+760%2Caps%2C188&sr=8-1')
console.log(b);