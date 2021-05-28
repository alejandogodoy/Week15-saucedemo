const Page = require('./page');

class CartPage extends Page {

    get addedItemsBadge () { return $('.shopping_cart_badge')}
    get shoppingCart () { return $('.shopping_cart_link')}

    // Title
    get cartTitle () { return $('.title')}

    // Items listed
    get itemBackpackTitle () { return $('.inventory_item_name=Sauce Labs Backpack') }
    get itemBackpackDesc() { return $('.inventory_item_desc*=carry.allTheThings() with the sleek') }
    get priceBackpack() { return $('.inventory_item_price*=29.99') }

    get itemBikeLightTitle () { return $('.inventory_item_name=Sauce Labs Bike Light') }
    get itemBikeLightDesc() { return $('.inventory_item_desc*=Water-resistant with 3 lighting modes, 1 AAA battery included.')}
    get priceBikeLight() { return $('.inventory_item_price*=9.99') }

    get itemBoltTShirtTitle () { return $('.inventory_item_name=Sauce Labs Bolt T-Shirt') }
    get itemBoltTShirtDesc() { return $('.inventory_item_desc*=Get your testing superhero on with the Sauce Labs bolt T-shirt.')}
    get priceBoltTShirt() { return $('.inventory_item_price*=15.99') }

    // Empty list
    get removedItems () { return $('.removed_cart_item')}

    // Continue Shopping
    get contShopBtn () { return $('#continue-shopping')}

    // Checkout 
    get checkoutBtn () { return $('#checkout')}

    // Cart Path
    open () {
        return super.open('cart.html');
}
}
    module.exports = new CartPage();