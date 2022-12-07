import React from 'react';
import ItemInCart from './ItemInCart';

class ProductsInCart extends React.Component {
    constructor(){
        super();
    }
    render(){
        return <div className='carted-products-cont cart-overlay-part'>
            {this.props.cartItemObjects.length>0 && this.props.cartItemObjects.map((cartItem, index) => <ItemInCart increaseTotalPriceOfCartItems={this.props.increaseTotalPriceOfCartItems} decreaseTotalPriceOfCartItems={this.props.decreaseTotalPriceOfCartItems}  setTotalPriceOfCartItems={this.props.setTotalPriceOfCartItems} currentCurrency={this.props.currentCurrency} data={cartItem} location={"cartOverlay"} key={index} />)}
        </div>
    }
}
export default ProductsInCart;