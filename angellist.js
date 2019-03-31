const faker = require('faker');

const createAngelAccount = async page => {
  const navigationPromise = page.waitForNavigation({
    waitUntil: 'networkidle2'
  });

  await page.goto('https://angel.co/join');

  await page.waitForSelector('#user_name');

  await page.type(
    '#user_name',
    `${faker.name.firstName()} ${faker.name.lastName()}`
  );

  const email = faker.internet.email();
  const password = faker.internet.password(10);

  await page.type('#user_email', email);

  await page.type('#user_password', password);

  let { captchas, error } = await page.findRecaptchas();
  let { solutions, error1 } = await page.getRecaptchaSolutions(captchas);
  let { solved, error2 } = await page.enterRecaptchaSolutions(solutions);

  console.log('captchas', captchas);
  console.log('solutions', solutions);
  console.log('solved', solved);
  console.log('error', error);
  console.log('error1', error1);
  console.log('error2', error2);

  await page.waitForSelector('input[type="submit"]');

  await Promise.all([navigationPromise, page.click('input[type="submit"]')]);

  await navigationPromise;

  await page.waitForSelector('div[data-_tn="onboarding/location"]');

  return {
    email: email,
    password: password
  };
};

module.exports = {
  createAngelAccount
};
