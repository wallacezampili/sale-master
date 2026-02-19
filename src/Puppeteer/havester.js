import { connect } from 'puppeteer-real-browser';

class Havester {

    browser = null;

    async startBrowser() {
        const { browser } = await connect({
            headless: false,
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

        this.browser = browser;
    }

    async closeBrowser() {
        await this.browser.close();
    }

    async getLigaYugiohData(cardUrl) {


        if (!this.browser) {
            await this.startBrowser();
        }

        const page = await this.browser.newPage();
        await page.goto(cardUrl, { waitUntil: 'domcontentloaded' });

        await new Promise(r => setTimeout(r, 5000));


        const minPriceSelector = ".min>.price";
        const mediumPriceSelector = ".medium>.price";
        const maxPriceSelector = ".max>.price";
        const cardNameSelector = ".item-name-en";


        let minPrice = await page.$eval(minPriceSelector, el => parseFloat(el.textContent.split(' ')[1]));
        let mediumPrice = await page.$eval(mediumPriceSelector, el => el.textContent);
        let maxPrice = await page.$eval(maxPriceSelector, el => el.textContent);
        let productName = await page.$eval(cardNameSelector, el => el.textContent);
        let cardImage = await page.$eval("#featuredImage", el => el.src);

        await page.close();

        return { productName, minPrice, mediumPrice, maxPrice, cardImage };

    }
    async getMercadoLivreData(productUrl) {

        if (!this.browser) {
            await this.startBrowser();
        }
        const page = await this.browser.newPage();

        await page.goto(productUrl, { waitUntil: 'domcontentloaded' });

        const priceSelector = '.andes-money-amount__fraction';
        const centsSelector = '.andes-money-amount__cents';
        const productNameSelector = '.ui-pdp-title';
        const imgSelector = '.ui-pdp-image';


        let cents = parseFloat(await page.$$eval(centsSelector, el => el[1].textContent)) / 100;
        let price = parseFloat(await page.$$eval(priceSelector, el => el[1].textContent)) + cents;

        let img = await page.$$(imgSelector)
        img = await page.evaluate(el => el.src, img[1]);

        let productName = await page.$(productNameSelector)
        productName = await page.evaluate(el => el.textContent, productName);

        await page.close();

        return { price, img, productName };

    }

    async getAmazonData(url) {
        
        let needToWait = true;
        if (!this.browser) {
            await this.startBrowser();
        }
        const page = await this.browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        
        try{
             
            const continueButtonSelector = '.a-button-text';
            await page.click(continueButtonSelector);

         }catch(e){
             console.log("No continue button found, proceeding...");
         }
        
        if(needToWait){
            await new Promise(r => setTimeout(r, 2000));
        }
        
        const priceSelector = '.a-price-whole';
        const centsSelector = '.a-price-fraction';
        const productNameSelector = '#productTitle';
        const imgSelector = '#landingImage';

        let cents = parseFloat(await page.$eval(centsSelector, el => el.textContent)) / 100;
        let price = parseFloat(await page.$eval(priceSelector, el => el.textContent)) + cents;
        let img = await page.$eval(imgSelector, el => el.src);
        let productName = await page.$eval(productNameSelector, el => el.textContent.trim());

        page.close();

        return { productName, price, img };


    }







}

let havy = new Havester();
let c = await havy.getAmazonData('https://www.amazon.com.br/Casas-estranhas-Vol/dp/8551013130/ref=sr_1_1?crid=3MIIJVAQ2QATF&dib=eyJ2IjoiMSJ9.d3d58jkDPzoMx9Jgie2Mj6AHz3kchkt4s0dkBL4NGN7VVAu8VAZ8wByEoGvvhNLelsZcaFIWJekPhlO_K8bzz5l2BggJqx2wFQ0p1WtjoCT0iDEz49sV6itPeeD4J_VmSfE4mtWmJpKs53EA0nAoVciLYat8NnLWoRZPGClgIha-6Q5ZdUxhUHrwjaCrgG6Ohsq5bwdFtKlawdTPfsU7Xk6k8xmONFm70OcWWFnAUysTEJkrG9EYmfgz5LHRBqzOAJ7zjuXTv_BZUST0_-Lqrtii8O4ufZqbinN2jvpatco.AC_tTdUO0KG-X2LPv-uYBkpUHVXyBIZIWxzHqXusz4o&dib_tag=se&keywords=casas+estranhas&qid=1770290810&sprefix=casas+%2Caps%2C202&sr=8-1')
let d = await havy.getAmazonData('https://www.amazon.com.br/PLACA-VIDEO-ASUS-RADEON-GDDR6/dp/B0DKPGQT97/ref=sr_1_1?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2QP2EML0OLRF6&dib=eyJ2IjoiMSJ9.oivPH3JFQibjl2KZbjViIcIJ_19htBQeX3SxwY1eG7kJki2QozlvqeXIvbm-CdwWuyFtxQaqD4bVC1SpstOoudlF4VVBG08JqOqSbAKOCJ64TSI3erFxKJwsASfwyUS-TkMOUQbWpyUArdmrAuFik8d7D9FUJ2WYFsKe6U4IxU84PZC9itSoWVNrGnfnhQT--8T05fWH0RM6EDLqtEjuyInz-UlEjOdU-FhbzHeiQmRmeb4Wh50A8zLnW6gR3zEMBSfqhb-IeAcMOzyyrodMdjBQ_4N1u2qVqE9G0nRgm-Y.U1pO_4sYFiPyslic97WWie-uUQQm4_J6dnrdKEBbx-M&dib_tag=se&keywords=rx+7600&qid=1770290851&sprefix=rx+760%2Caps%2C188&sr=8-1')

let b = await havy.getMercadoLivreData('https://www.mercadolivre.com.br/switch-gigabit-de-mesa-tp-link-8-portas-ls1008g/p/MLB15710408#polycard_client=recommendations_home_navigation-trend-recommendations&reco_backend=machinalis-homes-univb&wid=MLB4340981941&reco_client=home_navigation-trend-recommendations&reco_item_pos=0&reco_backend_type=function&reco_id=34633076-923c-4947-a237-b4b07b93b32e&sid=recos&c_id=/home/navigation-trend-recommendations/element&c_uid=c80d6e0f-0d65-4915-a6cb-bd77648bb506');
let a = await havy.getMercadoLivreData('https://www.mercadolivre.com.br/relogio-casual-tomate-mtxp015g-dourado-preto-resistente-agua-30m/p/MLB52766502#polycard_client=search-desktop&search_layout=grid&position=6&type=product&tracking_id=692499e6-5379-4be3-9e58-f4564c8fe18d&wid=MLB4210640877&sid=search')
const card = await havy.getLigaYugiohData('https://www.ligayugioh.com.br/?view=cards/card&card=D/D/D%20Zero%20Doom%20Queen%20Machinex');

const card2 = await havy.getLigaYugiohData('https://www.ligayugioh.com.br/?view=cards%2Fcard&card=Florescer+de+Cinzas+%26+Primavera+Feliz&tipo=1');

console.log(card);
console.log(card2);
console.log(a);
console.log(b);
console.log(c);
console.log(d);


havy.closeBrowser();