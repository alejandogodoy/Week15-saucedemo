const Page = require('./page');

class checkoutPage extends Page {

    // title 
    get title () { return $('.title')}


    // Checkout inputs
    get firstName () { return $('#first-name')}
    get lastName () { return $('#last-name')}
    get postCode () { return $('#postal-code')}

    // Checkout buttons
    get cancelBtn () { return $('#cancel')}
    get continueBtn () { return $('#continue')}
    get finishBtn () { return $('#finish')}

    // Prices
    get subtotal() { return $('.summary_subtotal_label') }
    get tax() { return $('.summary_tax_label') }
    get total() { return $('.summary_total_label') }

    // Comp checkout elements
    get header () { return $('.complete-header') }
    get textOrder () { return $('.complete-text') }
    get ponyExpressImg () { return $('.pony_express') }

    // Checkout Step 1
    open () {
        return super.open('checkout-step-one.html');
    }
    // Checkout Step 2
    open2 () {
        return super.open('checkout-step-two.html');
    }
    // Checkout Complete
    open3 () {
        return super.open('checkout-complete.html');
    }
}
module.exports = new checkoutPage();