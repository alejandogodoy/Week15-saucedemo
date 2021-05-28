const LoginPage = require("../pageobjects/login.page");
const menuPage = require("../pageobjects/menu.page");
const CartPage = require("../pageobjects/cart.page");
const inventoryPage = require("../pageobjects/inventory.page");

describe("Menu Button Tests", () => {
  beforeAll("Open browser and log in with standard user", () => {
    LoginPage.open();
    LoginPage.username.setValue("standard_user");
    LoginPage.password.setValue("secret_sauce");
    LoginPage.submit();
    browser.pause(3000);
  });
  it("Clicking on the Menu button should open a sidebar", () => {
    menuPage.menuBtn.click();
    browser.pause(3000);

    expect(menuPage.navBar).toBeDisplayed();
  });
  it("Clicking on the 'All Items' button should open to the inventory Page", () => {
    CartPage.shoppingCart.click();
    browser.pause(2000);
    menuPage.menuBtn.click();
    menuPage.itemsBtn.click();
    browser.pause(2000);

    expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
  });
  it("Clicking on the 'About' button should open SauceLabs Website", () => {
    inventoryPage.open();
    browser.pause(2000);
    menuPage.menuBtn.click();
    menuPage.aboutBtn.click();
    browser.pause(2000);

    expect(browser).toHaveUrl("https://saucelabs.com/");
  });
  it("By clicking the 'Reset App State' button, the cart should be cleared and the items in the cart badge should not show a number", () => {
    inventoryPage.open();
    browser.pause(2000);
    inventoryPage.addBackpack.click();
    browser.pause(2000);
    menuPage.menuBtn.click();
    menuPage.resetBtn.click();
    browser.pause(2000);

    expect(CartPage.addedItemsBadge).toMatch("");
  });
  it("By clicking on the 'Reset App State' button, the cart should be cleared and allowed to select items again", () => {
    inventoryPage.open();
    browser.pause(2000);
    inventoryPage.addBackpack.click();
    browser.pause(2000);
    menuPage.menuBtn.click();
    menuPage.resetBtn.click();
    browser.pause(2000);

    expect(inventoryPage.removeBackpack).toBeDisplayed();
  });
  it("Clicking the 'Logout' button should log you out and redirect to the login page.", () => {
    inventoryPage.open();
    browser.pause(2000);
    menuPage.menuBtn.click();
    menuPage.logOutBtn.click();
    browser.pause(2000);
    expect(browser).toHaveUrl("https://www.saucedemo.com/");
  });
});
