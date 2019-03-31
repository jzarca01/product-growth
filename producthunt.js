const upvoteProductHunt = async (page, productSlug) => {
  const navigationPromise = page.waitForNavigation({
    waitUntil: 'networkidle2'
  });
  await page.goto('https://www.producthunt.com/auth/angellist?origin=%2F');
  await navigationPromise;

  await page.click('input[value="Allow"]');

  await navigationPromise;

  await page.waitForSelector('div[data-test="modal"]');
  await page.click('a[data-test="modal-close"]');

  await navigationPromise;

  await page.goto(`https://www.producthunt.com/posts/${productSlug}`, {
    waitUntil: 'networkidle2'
  });

  await page.waitFor(10000);

  await page.evaluate(async () => {
    const button = document.querySelector('button[data-test="vote-button"]');
    console.log(button);
    return await button.click();
  });

  await page.waitFor(2000);
};

module.exports = {
  upvoteProductHunt
};
