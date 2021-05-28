const CartPage = require("../pageobjects/cart.page");
const LoginPage = require("../pageobjects/login.page");
const inventoryPage = require("../pageobjects/inventory.page");

describe("Shopping Cart Test", () => {
  beforeAll("Open browser and log in with standard user", () => {
    LoginPage.open();
    LoginPage.username.setValue("standard_user");
    LoginPage.password.setValue("secret_sauce");
    LoginPage.submit();
    browser.pause(3000);
  });
  it("The Shopping cart link is enabled and redirects to the cart page.", () => {
    CartPage.shoppingCart.click();
    browser.pause(3000);
    expect(browser).toHaveUrl("https://www.saucedemo.com/cart.html");
    expect(CartPage.cartTitle).toHaveText("YOUR CART");
  });
});
describe("Continue Shopping button", () => {
  it("The 'Continue Shopping' button is enabled and redirect back to inventory page", () => {
    CartPage.open();
    CartPage.contShopBtn.click();
    browser.pause(3000);
    expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
  });
});
describe("Verify that the selected items are added to the cart page and can be removed", () => {
  it("Items selected from the inventory page should appear on the cart page.", () => {
    inventoryPage.open();
    browser.pause(3000);
    inventoryPage.addBackpack.click();
    inventoryPage.addBikeLight.click();
    CartPage.shoppingCart.click();
    expect(browser).toHaveUrl("https://www.saucedemo.com/cart.html");
    browser.pause(3000);

    expect(CartPage.itemBackpackTitle).toBeDisplayed();
    expect(CartPage.itemBackpackDesc).toBeDisplayed();
    expect(CartPage.priceBackpack).toBeDisplayed();
    expect(CartPage.itemBikeLightTitle).toBeDisplayed();
    expect(CartPage.itemBikeLightDesc).toBeDisplayed();
    expect(CartPage.priceBikeLight).toBeDisplayed();
  });
  it("Items listed on the cart page must be removed by clicking the 'Remove' button", () => {
    browser.pause(3000);
    inventoryPage.removeBackpack.click();
    inventoryPage.removeBikeLight.click();
    expect(CartPage.itemBackpackTitle).not.toBeDisplayed();
    expect(CartPage.itemBikeLightTitle).not.toBeDisplayed();
    expect(CartPage.removedItems).toExist();
  });
});
describe("Checkout button Test", () => {
  it("The 'Checkout' button is enabled and redirect to the checkout page", () => {
    CartPage.checkoutBtn.click();
    browser.pause(3000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/checkout-step-one.html"
    );
  });
  it("It must allow the user to checkout when the cart has at least one item", () => {
    inventoryPage.open();
    browser.pause(3000);
    inventoryPage.addBackpack.click();
    CartPage.shoppingCart.click();
    expect(browser).toHaveUrl("https://www.saucedemo.com/cart.html");
    browser.pause(3000);
    CartPage.checkoutBtn.click();
    browser.pause(2000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/checkout-step-one.html"
    );
    browser.pause(2000);
  });
  it("It should not allow the user to checkout when the cart is empty", () => {
    inventoryPage.open();
    inventoryPage.removeBackpack.click();
    CartPage.shoppingCart.click();
    browser.pause(3000);
    CartPage.checkoutBtn.click();
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/checkout-step-one.html"
    );
    browser.pause(2000);
  });
});
