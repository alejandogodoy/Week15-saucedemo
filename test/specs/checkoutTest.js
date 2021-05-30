const CartPage = require("../pageobjects/cart.page");
const LoginPage = require("../pageobjects/login.page");
const inventoryPage = require("../pageobjects/inventory.page");
const checkoutPage = require("../pageobjects/checkout.page");

describe("Checkout Page Tests", () => {
  beforeAll(
    "Open the browser and login (standard_user), add 2 items, go to the cart and click the 'Checkout' button",
    () => {
      LoginPage.open();
      LoginPage.username.setValue("standard_user");
      LoginPage.password.setValue("secret_sauce");
      LoginPage.submit();
      browser.pause(2000);
      inventoryPage.addBackpack.click();
      inventoryPage.addBikeLight.click();
      browser.pause(2000);
      CartPage.shoppingCart.click();
      browser.pause(2000);
      CartPage.checkoutBtn.click();
      browser.pause(2000);
    }
  );
  it("verify that the Checkout Page and its Title are displayed", () => {
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/checkout-step-one.html"
    );
    expect(checkoutPage.title).toHaveText("CHECKOUT: YOUR INFORMATION");
  });
});
describe("Cancel button", () => {
  it("'Cancel' Button is enabled and redirect back to the cart page", () => {
    checkoutPage.open();
    checkoutPage.cancelBtn.click();
    browser.pause(2000);

    expect(browser).toHaveUrl("https://www.saucedemo.com/cart.html");
  });
});
describe("Trying to continue to the next step leaving empty inputs", () => {
  it("should not allow to continue leaving all the entries empty (Name, Last name and Postal Code)", () => {
    checkoutPage.open();
    checkoutPage.firstName.setValue("");
    checkoutPage.lastName.setValue("");
    checkoutPage.postCode.setValue("");
    browser.pause(2000);
    checkoutPage.continueBtn.click();
    browser.pause(2000);

    expect(LoginPage.errorMessageInput).toHaveText(
      "Error: First Name is required"
    );
  });
  it("Should not allow to continue providing First Name but empty Last Name and Postal Code", () => {
    checkoutPage.firstName.setValue("Alejandro");
    checkoutPage.lastName.setValue("");
    checkoutPage.postCode.setValue("");
    browser.pause(2000);
    checkoutPage.continueBtn.click();
    browser.pause(2000);

    expect(LoginPage.errorMessageInput).toHaveText(
      "Error: Last Name is required"
    );
  });
  it("Should not allow to continue providing First Name and Last Name and leaving Postal Code empty", () => {
    checkoutPage.firstName.setValue("Alejandro");
    checkoutPage.lastName.setValue("Godoy");
    checkoutPage.postCode.setValue("");
    browser.pause(2000);
    checkoutPage.continueBtn.click();
    browser.pause(2000);

    expect(LoginPage.errorMessageInput).toHaveText(
      "Error: Postal Code is required"
    );
  });
});
describe("Trying to continue to next step providing invalids inputs", () => {
  it("Should not allow to proceed to the next step by providing an invalid first name, but a valid last name and postal code.", () => {
    checkoutPage.open();
    checkoutPage.firstName.setValue("1234567abc");
    checkoutPage.lastName.setValue("Godoy");
    checkoutPage.postCode.setValue("2000");
    browser.pause(2000);
    checkoutPage.continueBtn.click();
    browser.pause(2000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/checkout-step-two.html"
    );
    //THE TEST WILL PASS DUE TO A DEVELOPMENT ERROR ITS MISSING SOME VALIDATIONS.
  });
  it("Should not allow to proceed to next step by providing valid First Name but invalids Last Name and Postal Code", () => {
    checkoutPage.open();
    checkoutPage.firstName.setValue("Alejandro");
    checkoutPage.lastName.setValue("999999");
    checkoutPage.postCode.setValue("0q-2!");
    browser.pause(2000);
    checkoutPage.continueBtn.click();
    browser.pause(2000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/checkout-step-two.html"
    );
    //THE TEST WILL PASS DUE TO A DEVELOPMENT ERROR ITS MISSING SOME VALIDATIONS.
  });
  it("Should not allow to proceed to next step by providing valid First Name and Last Name but invalid Postal Code", () => {
    checkoutPage.open();
    checkoutPage.firstName.setValue("Alejandro");
    checkoutPage.lastName.setValue("Godoy");
    checkoutPage.postCode.setValue("1*2-!");
    browser.pause(2000);
    checkoutPage.continueBtn.click();
    browser.pause(2000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/checkout-step-two.html"
    );
    //THE TEST WILL PASS DUE TO A DEVELOPMENT ERROR ITS MISSING SOME VALIDATIONS.
  });
});
describe("Trying to continue to the next step by providing valid inputs", () => {
  it("Should allow to proceed to next step by providing valid First Name, Last Name and Postal Code", () => {
    checkoutPage.open();
    checkoutPage.firstName.setValue("Alejandro");
    checkoutPage.lastName.setValue("Godoy");
    checkoutPage.postCode.setValue("2000");
    browser.pause(2000);
    checkoutPage.continueBtn.click();
    browser.pause(2000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/checkout-step-two.html"
    );
  });
});
describe("Checkout Page Step 2", () => {
  it("should check if the 'Checkout' page and its Title is displayed", () => {
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/checkout-step-two.html"
    );
    expect(checkoutPage.title).toHaveText("CHECKOUT: OVERVIEW");
  });
});

describe("Verify the selected items are listed in the checkout page step 2", () => {
  it("The items selected from inventory page should be listed in the 'Cart' page", () => {
    checkoutPage.open2();
    browser.pause(3000);
    expect(CartPage.itemBackpackTitle).toBeDisplayed();
    expect(CartPage.itemBackpackDesc).toBeDisplayed();
    expect(CartPage.priceBackpack).toBeDisplayed();
    expect(CartPage.itemBikeLightTitle).toBeDisplayed();
    expect(CartPage.itemBikeLightDesc).toBeDisplayed();
    expect(CartPage.priceBikeLight).toBeDisplayed();
  });
});
describe("Verify the subtotal and total price are correct", () => {
  it("The subtotal should be the sum of the prices of the selected items (29.99 + 9.99) = (39.98)", () => {
    checkoutPage.open2();
    browser.pause(3000);

    expect(checkoutPage.subtotal).toHaveTextContaining("39.98");
  });
  it("The total should be the sum of the subtotal and the tax(39.98 + 3.20) = (43.18)", () => {
    checkoutPage.open2();
    browser.pause(3000);

    expect(checkoutPage.subtotal).toHaveTextContaining("39.98");
    expect(checkoutPage.total).toHaveTextContaining("43.18");
  });
});
describe("Cancel button", () => {
  it("Cancel Button is enabled and redirect back to the inventory page", () => {
    checkoutPage.open2();
    checkoutPage.cancelBtn.click();
    browser.pause(2000);

    expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
  });
});
describe("Finish button", () => {
  it("Finish Button is enabled and directs to a complete-checkout page)", () => {
    checkoutPage.open2();
    checkoutPage.finishBtn.click();
    browser.pause(3000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/checkout-complete.html"
    );
  });
});

describe("Complete Checkout Page", () => {
  it("Should verify 'Checkout' page is displayed and its title", () => {
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/checkout-complete.html"
    );
    expect(checkoutPage.title).toHaveText("CHECKOUT: COMPLETE!");
  });
});

describe("Verify that the purchase information is displayed on the Complete Checkout page", () => {
  it("Some information related to the completed purchase process should be displayed on the complete checkout page", () => {
    checkoutPage.open3();
    browser.pause(3000);
    expect(checkoutPage.header).toBeDisplayed();
    expect(checkoutPage.textOrder).toBeDisplayed();
    expect(checkoutPage.ponyExpressImg).toBeDisplayed();
  });
});
describe("Back Home button", () => {
  it("Back Home is enabled and redirect back to the inventory page", () => {
    checkoutPage.open3();
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/checkout-complete.html"
    );
    expect(inventoryPage.backToProductsBtn).toBeDisplayed();
    inventoryPage.backToProductsBtn.click();
    browser.pause(2000);
    expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
    browser.pause(2000);
    browser.reloadSession();
  });
});
