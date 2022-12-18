import React from 'react';
import ItemInCart from './ItemInCart';

class ProductsInCart extends React.Component {
    constructor(){
        super();
    }
    render(){
        return <div className='carted-products-cont thin-scrollbar-cstm cart-overlay-part'>
            {this.props.cartItemObjectKeys.length>0 && this.props.cartItemObjectKeys.map((cartItemKey, index) => <ItemInCart changeSpecificItemAmount={this.props.changeSpecificItemAmount}
            totalPriceOfCartItems={this.props.totalPriceOfCartItems} betterPrices={this.props.betterPrices}
            totalItems={this.props.totalItems} changeTotalPriceOfCartItems={this.props.changeTotalPriceOfCartItems} rebuildCart={this.props.rebuildCart}
            cartItemObjectKeys={this.props.cartItemObjectKeys} cartItemObjects={this.props.cartItemObjects} 
            currentCurrency={this.props.currentCurrency} 
            data={this.props.cartItemObjects[cartItemKey]} location={"cartOverlay"} key={index} />)}
        </div>
    }
}
export default ProductsInCart;