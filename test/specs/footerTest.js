const LoginPage = require("../pageobjects/login.page");
const footerPage = require("../pageobjects/footer.page");

describe("Social Media Links Tests", () => {
  beforeAll("Open browser and log in with standard user", () => {
    LoginPage.open();
    LoginPage.username.setValue("standard_user");
    LoginPage.password.setValue("secret_sauce");
    LoginPage.submit();
    browser.pause(3000);
  });
  it("The 'Social Media' buttons should appear in the footer", () => {
    expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
    expect(footerPage.twitterBtn).toBeDisplayed();
    expect(footerPage.facebookBtn).toBeDisplayed();
    expect(footerPage.linkedInBtn).toBeDisplayed();
  });
  it("'Social media' buttons must have the respective link", () => {
    expect(footerPage.twitterLink).toHaveLinkContaining(
      "https://twitter.com/saucelabs"
    );
    expect(footerPage.facebookLink).toHaveLinkContaining(
      "https://www.facebook.com/saucelabs"
    );
    expect(footerPage.linkedInLink).toHaveLinkContaining(
      "https://www.linkedin.com/company/sauce-labs/"
    );
  });
  it("By clicking on the Twitter button, you should be redirected to the SwagLabs Twitter page", () => {
    footerPage.twitterBtn.click();
    browser.pause(3000);
    browser.switchWindow("https://twitter.com/saucelabs");
    expect(browser).toHaveUrl("https://twitter.com/saucelabs");
    browser.closeWindow();
    browser.switchWindow("https://www.saucedemo.com/inventory.html");
  });
  it("By Clicking on the Facebook button, you should redirected to the SwagLabs Facebook page", () => {
    footerPage.facebookBtn.click();
    browser.pause(3000);
    browser.switchWindow("https://www.facebook.com/saucelabs");
    expect(browser).toHaveUrl("https://www.facebook.com/saucelabs");
    browser.closeWindow();
    browser.switchWindow("https://www.saucedemo.com/inventory.html");
  });
  it("By Clicking on the LinkedIn button, you should redirected to the SwagLabs LinkedIn page", () => {
    footerPage.linkedInBtn.click();
    browser.pause(3000);
    browser.switchWindow("linkedin.com");
    browser.pause(3000);
    expect(browser).toHaveUrlContaining("https://www.linkedin.com");
    /* THIS SHOULD BE THE CORRECT LINK BUT LinkedIn REQUIRES YOU TO BE REGISTER TO SHOW IT
    expect(browser).toHaveUrl('https://www.linkedin.com/company/sauce-labs/')*/
  });
});
