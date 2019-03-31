const puppeteer = require('puppeteer-extra');
const { createAngelAccount } = require('./angellist');
const { upvoteProductHunt } = require('./producthunt');
const { getProxy } = require('./proxy');

const config = require('./config/config.json');

const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const recaptchaPlugin = RecaptchaPlugin({
  provider: { id: '2captcha', token: config.apiKey }
});
puppeteer.use(recaptchaPlugin);

// const pluginStealth = require('puppeteer-extra-plugin-stealth');
//puppeteer.use(pluginStealth());

const mainFunction = async browser => {
  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);

    const angelAccount = await createAngelAccount(page);
    console.log(angelAccount);

    await upvoteProductHunt(page);
  } catch (err) {
    browser.close();
    console.log('Something wrong happened', err);
  }
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

(async () => {
  const accounts = new Array(9999).fill(0);
  asyncForEach(accounts, async () => {
    const { ip, port } = await getProxy();
    console.log(`${ip}:${port}`);
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      args: [`--proxy-server=${ip}:${port}`]
    });
    await mainFunction(browser);
    await browser.close();
  });
})();
