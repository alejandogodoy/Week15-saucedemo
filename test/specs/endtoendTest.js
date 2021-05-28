const CartPage = require("../pageobjects/cart.page");
const LoginPage = require("../pageobjects/login.page");
const inventoryPage = require("../pageobjects/inventory.page");
const checkoutPage = require("../pageobjects/checkout.page");
const cartPage = require("../pageobjects/cart.page");
const menuPage = require("../pageobjects/menu.page");

describe("End to end tests for standard user - Successful purchase process ", () => {
  beforeAll("Open 'SauceDemo' page", () => {
    LoginPage.open();
    browser.pause(2000);
  });
  it("Log in with standard user valid credentials", () => {
    LoginPage.username.setValue("standard_user");
    LoginPage.password.setValue("secret_sauce");
    LoginPage.submit();
    browser.pause(3000);
    expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
  });
  it("Sort products from Low to High price", () => {
    inventoryPage.sortByBtn.click();
    browser.pause(3000);
    inventoryPage.sortByPriceLowToHigh.click();
    expect(inventoryPage.firstItem).toHaveTextContaining("Sauce Labs Onesie");
    expect(inventoryPage.secondItem).toHaveTextContaining(
      "Sauce Labs Bike Light"
    );
    expect(inventoryPage.thirdItem).toHaveTextContaining(
      "Sauce Labs Bolt T-Shirt"
    );
    expect(inventoryPage.fourthItem).toHaveTextContaining(
      "Test.allTheThings() T-Shirt (Red)"
    );
    expect(inventoryPage.fifthItem).toHaveTextContaining("Sauce Labs Backpack");
    expect(inventoryPage.sixthItem).toHaveTextContaining(
      "Sauce Labs Fleece Jacket"
    );
  });
  it("Select and add items from the inventory page to the cart", () => {
    inventoryPage.addBackpack.click();
    inventoryPage.addBikeLight.click();
    inventoryPage.addBoltTShirt.click();
    browser.pause(3000);
    expect(CartPage.addedItemsBadge).toHaveText("3");
  });
  it("Verify that the selected items are added to the cart page and that the user is enabled to continue to the checkout page", () => {
    CartPage.shoppingCart.click();
    browser.pause(3000);
    expect(CartPage.itemBackpackTitle).toBeDisplayed();
    expect(CartPage.itemBackpackDesc).toBeDisplayed();
    expect(CartPage.priceBackpack).toBeDisplayed();
    expect(CartPage.itemBikeLightTitle).toBeDisplayed();
    expect(CartPage.itemBikeLightDesc).toBeDisplayed();
    expect(CartPage.priceBikeLight).toBeDisplayed();
    expect(CartPage.itemBoltTShirtTitle).toBeDisplayed();
    expect(CartPage.itemBoltTShirtDesc).toBeDisplayed();
    expect(CartPage.priceBoltTShirt).toBeDisplayed();
    CartPage.checkoutBtn.click();
  });
  it("Providing valid First Name, Last Name and Postal Code and continuing to next step", () => {
    browser.pause(3000);
    expect(checkoutPage.title).toHaveText("CHECKOUT: YOUR INFORMATION");
    checkoutPage.firstName.setValue("Alejandro");
    checkoutPage.lastName.setValue("Godoy");
    checkoutPage.postCode.setValue("2000");
    browser.pause(2000);
    checkoutPage.continueBtn.click();
  });
  it("Verify that the selected items are listed in step 2 of the checkout page", () => {
    browser.pause(2000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/checkout-step-two.html"
    );
    expect(checkoutPage.title).toHaveText("CHECKOUT: OVERVIEW");
    expect(cartPage.itemBackpackTitle).toBeDisplayed();
    expect(cartPage.itemBackpackDesc).toBeDisplayed();
    expect(cartPage.priceBackpack).toBeDisplayed();
    expect(CartPage.itemBikeLightTitle).toBeDisplayed();
    expect(CartPage.itemBikeLightDesc).toBeDisplayed();
    expect(CartPage.priceBikeLight).toBeDisplayed();
    expect(CartPage.itemBoltTShirtTitle).toBeDisplayed();
    expect(CartPage.itemBoltTShirtDesc).toBeDisplayed();
    expect(CartPage.priceBoltTShirt).toBeDisplayed();
    expect(checkoutPage.subtotal).toHaveTextContaining("55.97");
    expect(checkoutPage.total).toHaveTextContaining("60.45");
  });
  it("Cancel checkout to allow user to remove products before continuing", () => {
    checkoutPage.cancelBtn.click();
    browser.pause(3000);
    expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
    expect(inventoryPage.mainTitle).toHaveText("PRODUCTS");
    inventoryPage.removeBoltTShirt.click();
    expect(CartPage.addedItemsBadge).toHaveText("2");
  });
  it("Return to checkout", () => {
    CartPage.shoppingCart.click();
    browser.pause(3000);
    expect(browser).toHaveUrl("https://www.saucedemo.com/cart.html");
    expect(CartPage.itemBackpackTitle).toBeDisplayed();
    expect(CartPage.itemBackpackDesc).toBeDisplayed();
    expect(CartPage.priceBackpack).toBeDisplayed();
    expect(CartPage.itemBikeLightTitle).toBeDisplayed();
    expect(CartPage.itemBikeLightDesc).toBeDisplayed();
    expect(CartPage.priceBikeLight).toBeDisplayed();
    CartPage.checkoutBtn.click();
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/checkout-step-one.html"
    );
  });
  it("Confirm checkout", () => {
    browser.pause(3000);
    expect(checkoutPage.title).toHaveText("CHECKOUT: YOUR INFORMATION");
    checkoutPage.firstName.setValue("Alejandro");
    checkoutPage.lastName.setValue("Godoy");
    checkoutPage.postCode.setValue("2000");
    browser.pause(2000);
    checkoutPage.continueBtn.click();
    browser.pause(2000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/checkout-step-two.html"
    );
    expect(checkoutPage.title).toHaveText("CHECKOUT: OVERVIEW");
    expect(checkoutPage.subtotal).toHaveTextContaining("39.98");
    expect(checkoutPage.total).toHaveTextContaining("43.18");
    checkoutPage.finishBtn.click();
    browser.pause(3000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/checkout-complete.html"
    );
  });
  it("Once the checkout process is complete, return to the home page and log out", () => {
    inventoryPage.backToProductsBtn.click();
    expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
    browser.pause(2000);
    menuPage.menuBtn.click();
    menuPage.logOutBtn.click();
    browser.pause(2000);
    expect(browser).toHaveUrl("https://www.saucedemo.com/");
  });
});
