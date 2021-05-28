const LoginPage = require("../pageobjects/login.page");

describe("Login Form button", () => {
  it("Login button is enabled", () => {
    LoginPage.open();
    browser.pause(3000);
    expect(LoginPage.submitBtn).toExist;
    expect(LoginPage.submitBtn).toBeClickable;
  });
});
describe("Empty inputs Tests", () => {
  beforeEach("Open browser", () => {
    LoginPage.open();
  });
  it("Trying to access with empty inputs should display error message", () => {
    LoginPage.username.setValue("");
    LoginPage.password.setValue("");
    LoginPage.submit();
    browser.pause(5000);

    expect(LoginPage.errorMessageInput).toHaveText(
      "Epic sadface: Username is required"
    );
  });
  it("Trying to access with only username should display error message", () => {
    LoginPage.username.setValue("standard_user");
    LoginPage.password.setValue("");
    LoginPage.submit();
    browser.pause(5000);

    expect(LoginPage.errorMessageInput).toHaveText(
      "Epic sadface: Password is required"
    );
  });
  it("Trying to access with correct password and empty username should display error message", () => {
    LoginPage.username.setValue("");
    LoginPage.password.setValue("secret_sauce");
    LoginPage.submit();
    browser.pause(5000);

    expect(LoginPage.errorMessageInput).toHaveText(
      "Epic sadface: Username is required"
    );
  });
});
describe("Login with invalid credentials", () => {
  beforeEach("Open browser", () => {
    LoginPage.open();
  });
  it("Trying to access with valid username and wrong password should display error message", () => {
    LoginPage.username.setValue("standard_user");
    LoginPage.password.setValue("123456");
    LoginPage.submit();
    browser.pause(5000);

    expect(LoginPage.errorMessageInput).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("Trying to access with valid password and wrong username should display error message", () => {
    LoginPage.username.setValue("standarduser");
    LoginPage.password.setValue("secret_sauce");
    LoginPage.submit();
    browser.pause(5000);

    expect(LoginPage.errorMessageInput).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
  it("Trying to access with wrong Username and Password should display an error message", () => {
    LoginPage.username.setValue("Alejandro");
    LoginPage.password.setValue("1234567");
    LoginPage.submit();
    browser.pause(5000);

    expect(LoginPage.errorMessageInput).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
});

describe("Login with valid credentials", () => {
  beforeEach("Open browser", () => {
    LoginPage.open();
  });
  it("Login with 'standard_user' should be correct", () => {
    LoginPage.username.setValue("standard_user");
    LoginPage.password.setValue("secret_sauce");
    LoginPage.submit();
    browser.pause(5000);

    expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
  });

  it("Login with 'problem_user' should be correct", () => {
    LoginPage.username.setValue("problem_user");
    LoginPage.password.setValue("secret_sauce");
    LoginPage.submit();
    browser.pause(5000);

    expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
  });

  it("Login with 'performance_glitch_user' should be correct", () => {
    LoginPage.username.setValue("performance_glitch_user");
    LoginPage.password.setValue("secret_sauce");
    LoginPage.submit();
    browser.pause(5000);

    expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
  });
  it("Login with 'locked_out_user' should display an error message", () => {
    LoginPage.username.setValue("locked_out_user");
    LoginPage.password.setValue("secret_sauce");
    LoginPage.submit();
    browser.pause(5000);

    expect(LoginPage.errorMessageInput).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });
});
