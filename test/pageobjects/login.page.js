const Page = require("./page");

class LoginPage extends Page {

  get username() {
    return $("#user-name");
  }
  get password() {
    return $("#password");
  }

  get submitBtn() {
    return $("#login-button");
  }

  get errorMessageInput() {
    return $(".error-message-container.error");
  }

  open() {
    return super.open("");
  }

  submit() {
    this.submitBtn.click();
  }
}
module.exports = new LoginPage();