import React from 'react';
import ItemInCart from './ItemInCart';

class ProductsInCart extends React.Component {
    constructor(){
        super();
    }
    
    render(){
        return <div className='carted-products-cont cart-overlay-part'>
            {this.props.cartItemObjects.map((cartItem, index) => <ItemInCart currentCurrency={this.props.currentCurrency} data={cartItem} location={"cartOverlay"} key={index} />)}
        </div>
    }
}
export default ProductsInCart;