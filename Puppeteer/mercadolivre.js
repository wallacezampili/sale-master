import puppeteer, { Browser }  from "puppeteer";

async function getMercadoLivreData(productUrl) {
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    
    await page.goto(productUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForNetworkIdle();

    const priceSelector = '.andes-money-amount__fraction';
    let price = await page.$$(priceSelector)
    price = await page.evaluate(el => el.textContent, price[1]);
    
    console.log(price);
    browser.close();
    return {price}

}


getMercadoLivreData('https://www.mercadolivre.com.br/relogio-casual-tomate-mtxp015g-dourado-preto-resistente-agua-30m/p/MLB52766502#polycard_client=search-desktop&search_layout=grid&position=6&type=product&tracking_id=692499e6-5379-4be3-9e58-f4564c8fe18d&wid=MLB4210640877&sid=search')
getMercadoLivreData('https://www.mercadolivre.com.br/relogio-prata-masculino-mondiane-32549g0mvne1-cor-da-correia-prateado-cor-do-fundo-preto/p/MLB23347882#polycard_client=recommendations_home_navigation-recommendations&reco_backend=machinalis-homes-univb-equivalent-offer&wid=MLB3846575151&reco_client=home_navigation-recommendations&reco_item_pos=4&reco_backend_type=function&reco_id=0b17c86d-776a-4491-8849-b7362f38f088&sid=recos&c_id=/home/navigation-recommendations/element&c_uid=a87e3dbe-d007-473f-b63b-db5c8f3d9ffa')
