const { clickElement, putText, getText } = require("./lib/commands.js");
const { getRandomInt} = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Go to cinema tests", () => {
  beforeEach(async () => {
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  test("Бронь на Зверополис на завтра", async () => {
    await clickElement(page, "nav > a:nth-child(2)");
    await clickElement(page, "body > main > section:nth-child(1) > div.movie-seances__hall > ul > li:nth-child(2) > a");
    await page.waitForSelector("div.buying-scheme");
    const place = ".buying-scheme__wrapper > :nth-child(5) > :nth-child(5)";
    await clickElement(page, place);
    await clickElement(page, "button.acceptin-button");
    await page.waitForSelector("h2");
    let filmTitle = await getText(page, `body > main > section > div > p:nth-child(1) > span`);
    expect(filmTitle).toEqual("Зверополис");
    let placeNumber = await getText(page, `body > main > section > div > p:nth-child(2) > span`);
    expect(placeNumber).toEqual("5/5");
    let price = await getText(page, `body > main > section > div > p:nth-child(6) > span`);
    expect(price).toEqual("150");
  }, 60000);

  test("Бронь вип на Унесенные ветром на послезавтра", async () => {
    await clickElement(page, "nav > a:nth-child(3)");
    await clickElement(page, "body > main > section:nth-child(3) > div:nth-child(2) > ul > li > a");
    await page.waitForSelector("div.buying-scheme");
    const place = ".buying-scheme__wrapper > :nth-child(4) > :nth-child(3)";
    await clickElement(page, place);
    await clickElement(page, "button.acceptin-button");
    await page.waitForSelector("h2");
    let filmTitle = await getText(page, `body > main > section > div > p:nth-child(1) > span`);
    expect(filmTitle).toEqual("Унесенные ветром.");
    let placeNumber = await getText(page, `body > main > section > div > p:nth-child(2) > span`);
    expect(placeNumber).toEqual("4/3");
    let price = await getText(page, `body > main > section > div > p:nth-child(6) > span`);
    expect(price).toEqual("350");
  }, 60000);

  test("Попытка купить занятые места на Микки Мауса на завтра", async () => {
    await clickElement(page, "nav > a:nth-child(2)");
    await clickElement(page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li:nth-child(1) > a");
    await page.waitForSelector("div.buying-scheme");
    const place = ".buying-scheme__wrapper > :nth-child(7) > :nth-child(7)";
    await clickElement(page, place);
    await clickElement(page, "button.acceptin-button");
    const stateOfButton = await page.$eval('button', (button) => {
      return button.disabled;
    });
    expect(stateOfButton).toEqual(true);
  }, 60000);
});