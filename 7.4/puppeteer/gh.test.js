let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
      const firstLink = await page.$("header div div a");
      await firstLink.click();
      await page.waitForSelector('h1');
      const title2 = await page.title();
      expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  }, 60000); 

  test("The first link attribute", async () => {
      const actual = await page.$eval("a", link => link.getAttribute('href') );
      expect(actual).toEqual("#start-of-content");
  }, 30000); 
  test("The page contains Sign in button", async () => {
      const btnSelector = ".btn-large-mktg.btn-mktg";
      await page.waitForSelector(btnSelector, {
          visible: true,
      });
      const actual = await page.$eval(btnSelector, link => link.textContent);
      expect(actual).toContain("Sign up for free")
  }, 45000); 
});
describe("Should test other menu sections", () => {
  beforeEach(async () => {
    page = await browser.newPage();
  });

  test("Go to Pricing", async () => {
    await page.goto("https://github.com/pricing");
    const title = await page.title();
    expect(title).toContain("Pricing · Plans for every developer · GitHub");
  }, 6000);
  test("Go to Enterprise", async () => {
    await page.goto("https://github.com/enterprise");
    const title = await page.title();
    expect(title).toContain("The AI Powered Developer Platform. · GitHub");
  },6000);
  test("Go to Sponsors",async () => {
    await page.goto("https://github.com/sponsors");
    const title = await page.title();
    expect(title).toContain("GitHub Sponsors · GitHub");
  },6000);
});
