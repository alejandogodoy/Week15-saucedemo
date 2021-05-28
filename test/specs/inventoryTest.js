const inventoryPage = require("../pageobjects/inventory.page");
const LoginPage = require("../pageobjects/login.page");
const CartPage = require("../pageobjects/cart.page");

describe("Inventory page Test", () => {
  beforeAll("Open browser and log in with standard user", () => {
    LoginPage.open();
    LoginPage.username.setValue("standard_user");
    LoginPage.password.setValue("secret_sauce");
    LoginPage.submit();
    browser.pause(3000);
  });
  it("Should verify that the inventory Page and its title are displayed", () => {
    expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
    expect(inventoryPage.mainTitle).toHaveText("PRODUCTS");
  });
});

describe("Back to Products button Test", () => {
  it("'Back to products' button is enabled and redirect to inventory page", () => {
    inventoryPage.open();
    inventoryPage.backpackTitle.click();
    browser.pause(3000);
    inventoryPage.backToProductsBtn.click();
    expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
  });
});
describe("'Sort By' - 'Filter' button Tests", () => {
  it("Clicking the 'Filter' button should open a drop-down list with different sorting options for the products", () => {
    inventoryPage.open();
    inventoryPage.sortByBtn.click();
    browser.pause(3000);
    expect(inventoryPage.sortByNameAtoZ).toBeDisplayed();
    expect(inventoryPage.sortByNameZtoA).toBeDisplayed();
    expect(inventoryPage.sortByPriceLowToHigh).toBeDisplayed();
    expect(inventoryPage.sortByPriceHighToLow).toBeDisplayed();
  });

  it("Sorting products by name, from A to Z", () => {
    inventoryPage.sortByBtn.click();
    browser.pause(3000);
    inventoryPage.sortByNameAtoZ.click();
    expect(inventoryPage.firstItem).toHaveTextContaining("Sauce Labs Backpack");
    expect(inventoryPage.secondItem).toHaveTextContaining(
      "Sauce Labs Bike Light"
    );
    expect(inventoryPage.thirdItem).toHaveTextContaining(
      "Sauce Labs Bolt T-Shirt"
    );
    expect(inventoryPage.fourthItem).toHaveTextContaining(
      "Sauce Labs Fleece Jacket"
    );
    expect(inventoryPage.fifthItem).toHaveTextContaining("Sauce Labs Onesie");
    expect(inventoryPage.sixthItem).toHaveTextContaining(
      "Test.allTheThings() T-Shirt (Red)"
    );
  });
  it("Sorting products by name, from Z to A", () => {
    inventoryPage.sortByBtn.click();
    browser.pause(3000);
    inventoryPage.sortByNameZtoA.click();
    expect(inventoryPage.firstItem).toHaveTextContaining(
      "Test.allTheThings() T-Shirt (Red)"
    );
    expect(inventoryPage.secondItem).toHaveTextContaining("Sauce Labs Onesie");
    expect(inventoryPage.thirdItem).toHaveTextContaining(
      "Sauce Labs Fleece Jacket"
    );
    expect(inventoryPage.fourthItem).toHaveTextContaining(
      "Sauce Labs Bolt T-Shirt"
    );
    expect(inventoryPage.fifthItem).toHaveTextContaining(
      "Sauce Labs Bike Light"
    );
    expect(inventoryPage.sixthItem).toHaveTextContaining("Sauce Labs Backpack");
  });
  it("Sorting products from Low to High price", () => {
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
  it("Sorting products from High to Low price", () => {
    inventoryPage.sortByBtn.click();
    browser.pause(3000);
    inventoryPage.sortByPriceHighToLow.click();
    expect(inventoryPage.firstItem).toHaveTextContaining(
      "Sauce Labs Fleece Jacket"
    );
    expect(inventoryPage.secondItem).toHaveTextContaining(
      "Sauce Labs Backpack"
    );
    expect(inventoryPage.thirdItem).toHaveTextContaining(
      "Sauce Labs Bolt T-Shirt"
    );
    expect(inventoryPage.fourthItem).toHaveTextContaining(
      "Test.allTheThings() T-Shirt (Red)"
    );
    expect(inventoryPage.fifthItem).toHaveTextContaining(
      "Sauce Labs Bike Light"
    );
    expect(inventoryPage.sixthItem).toHaveTextContaining("Sauce Labs Onesie");
  });
});
describe("Clicking on the title of the products display the description", () => {
  it("Test access to the backpack description by clicking on its title", () => {
    inventoryPage.backpackTitle.click();
    browser.pause(3000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/inventory-item.html?id=4"
    );
  });

  it("Test access to the Bike light description by clicking on its title", () => {
    inventoryPage.backToProductsBtn.click();
    inventoryPage.bikeLightTitle.click();
    browser.pause(3000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/inventory-item.html?id=0"
    );
  });

  it("Testing access to Bolt T-Shirt description by clicking on its title", () => {
    inventoryPage.backToProductsBtn.click();
    inventoryPage.boltTShirtTitle.click();
    browser.pause(3000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/inventory-item.html?id=1"
    );
  });

  it("Testing access to Jacket description by clicking on its title", () => {
    inventoryPage.backToProductsBtn.click();
    inventoryPage.fleeceJacketTitle.click();
    browser.pause(3000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/inventory-item.html?id=5"
    );
  });

  it("Testing access to Onesie description by clicking on its title", () => {
    inventoryPage.backToProductsBtn.click();
    inventoryPage.onesieTitle.click();
    browser.pause(3000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/inventory-item.html?id=2"
    );
  });

  it("Testing access to Red T-Shirt description by clicking on its title", () => {
    inventoryPage.backToProductsBtn.click();
    inventoryPage.redTShirtTitle.click();
    browser.pause(3000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/inventory-item.html?id=3"
    );
  });
});
describe("Clicking on the item's image should allow access to its description.", () => {
  it("Testing access to Backpack description by clicking on its image", () => {
    inventoryPage.open();
    inventoryPage.backpack.click();
    browser.pause(3000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/inventory-item.html?id=4"
    );
  });
  it("Testing access to Bike Light description by clicking on its image", () => {
    inventoryPage.backToProductsBtn.click();
    inventoryPage.bikeLight.click();
    browser.pause(3000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/inventory-item.html?id=0"
    );
  });
  it("Testing access to Bolt T-Shirt description by clicking on its image", () => {
    inventoryPage.backToProductsBtn.click();
    inventoryPage.boltTShirt.click();
    browser.pause(3000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/inventory-item.html?id=1"
    );
  });
  it("Testing access to jacket description by clicking on its image", () => {
    inventoryPage.backToProductsBtn.click();
    inventoryPage.jacket.click();
    browser.pause(3000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/inventory-item.html?id=5"
    );
  });
  it("Testing access to Onesie description by clicking on its image", () => {
    inventoryPage.backToProductsBtn.click();
    inventoryPage.onesie.click();
    browser.pause(3000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/inventory-item.html?id=2"
    );
  });
  it("Testing access to Red T-Shirt description by clicking on its image", () => {
    inventoryPage.backToProductsBtn.click();
    inventoryPage.redTShirt.click();
    browser.pause(3000);
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/inventory-item.html?id=3"
    );
  });
});
describe("Add items from the inventory page to the cart and then delete them", () => {
  it("Clicking on the 'Add to cart' button of the selected item should add it to the cart", () => {
    inventoryPage.open();
    inventoryPage.addBackpack.click();
    inventoryPage.addBikeLight.click();
    inventoryPage.addBoltTShirt.click();
    inventoryPage.addJacket.click();
    inventoryPage.addOnesie.click();
    inventoryPage.addRedTShirt.click();
    browser.pause(3000);
    expect(CartPage.addedItemsBadge).toHaveText("6");
  });
  it("Clicking on the 'Remove' button of the selected item should remove it from the cart", () => {
    inventoryPage.removeBackpack.click();
    inventoryPage.removeBikeLight.click();
    inventoryPage.removeBoltTShirt.click();
    inventoryPage.removeJacket.click();
    inventoryPage.removeOnesie.click();
    inventoryPage.removeRedTShirt.click();
    browser.pause(3000);
    expect(CartPage.addedItemsBadge).toMatch("");
  });
});
describe("Add items to the cart once the title is clicked and the description opens and then delete them", () => {
  it("Clicking on the 'Add to cart' button of the selected item should add it to the cart", () => {
    inventoryPage.backpackTitle.click();
    inventoryPage.addBackpack.click();
    inventoryPage.backToProductsBtn.click();
    inventoryPage.bikeLightTitle.click();
    inventoryPage.addBikeLight.click();
    browser.pause(3000);
    expect(CartPage.addedItemsBadge).toHaveText("2");
  });
  it("Clicking on the 'Remove' button of the selected item should remove it from the cart", () => {
    inventoryPage.removeBikeLight.click();
    inventoryPage.backToProductsBtn.click();
    inventoryPage.backpackTitle.click();
    inventoryPage.removeBackpack.click();
    browser.pause(3000);
    expect(CartPage.addedItemsBadge).toMatch("");
  });
});
