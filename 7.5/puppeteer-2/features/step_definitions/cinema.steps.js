const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { getText, clickElement } = require("../../lib/commands.js");

let browser;
let page;
let place;

Before(async function () {
  browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("пользователь на странице {string}", async function (url) {
  try {
    await this.page.goto(url, { setTimeout: 50000 });
  } catch (error) {
    throw new Error(`Failed to navigate to ${url} with error: ${error}`);
  }
});

When("переходит на расписание на завтра", async function () {
  return await clickElement(this.page, "nav > a:nth-child(2)");
});

When("выбирает время сеанса на Зверополис на 11-00", async function () {
  return await clickElement(this.page, "body > main > section:nth-child(1) > div.movie-seances__hall > ul > li:nth-child(2) > a");
});

When("выбирает место в зале кинотеатра 5 ряд 5 место", async function () {
  await this.page.waitForSelector("div.buying-scheme");
  place = ".buying-scheme__wrapper > :nth-child(5) > :nth-child(5)";
  await clickElement(this.page, place);
  await clickElement(this.page, "button.acceptin-button");
});

Then("получает результат брони до покупки", async function () {
  await this.page.waitForSelector("h2");
  let filmTitle = await getText(this.page, `body > main > section > div > p:nth-child(1) > span`);
  expect(filmTitle).equal("Зверополис");
  let placeNumber = await getText(this.page, `body > main > section > div > p:nth-child(2) > span`);
  expect(placeNumber).equal("5/5");
  let price = await getText(this.page, `body > main > section > div > p:nth-child(6) > span`);
  expect(price).equal("150");
});

When("переходит на расписание на послезавтра", async function () {
  return await clickElement(this.page, "nav > a:nth-child(3)");
});

When("выбирает время сеанса на Унесенные ветром на 17-00", async function () {
  return await clickElement(this.page, "body > main > section:nth-child(3) > div:nth-child(2) > ul > li > a");
});

When("выбирает места в зале кинотеатра 4 ряд 3 место",async function () {
  await page.waitForSelector("div.buying-scheme");
  const place = ".buying-scheme__wrapper > :nth-child(4) > :nth-child(3)";
  await clickElement(page, place);
  await clickElement(page, "button.acceptin-button");
  }
);

Then("получает результат брони вип до покупки", async function () {
  await page.waitForSelector("h2");
  let filmTitle = await getText(page, `body > main > section > div > p:nth-child(1) > span`);
  expect(filmTitle).equal("Унесенные ветром.");
  let placeNumber = await getText(page, `body > main > section > div > p:nth-child(2) > span`);
  expect(placeNumber).equal("4/3");
  let price = await getText(page, `body > main > section > div > p:nth-child(6) > span`);
  expect(price).equal("350");
});


When("выбирает время сеанса на Микки Маус на 11-00", async function () {
    return await clickElement(this.page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li:nth-child(1) > a");
  }
);

When("выбирает место в зале кинотеатра 7 ряд 7 место", async function () {
  await page.waitForSelector("div.buying-scheme");
  const place = ".buying-scheme__wrapper > :nth-child(7) > :nth-child(7)";
  await clickElement(page, place);
  await clickElement(page, "button.acceptin-button");
});

Then("место занято и получает результат", async function () {
  const stateOfButton = await page.$eval('button', (button) => {
    return button.disabled;
  });
  expect(stateOfButton).equal(true);
});