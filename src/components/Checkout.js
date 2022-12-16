import React from 'react';
import CheckoutItemInCart from './attribute for checkout/CheckoutItemInCart';

class Checkout extends React.Component { //prop list --> changeSpecificItemAmount, rebuildCart, cartItemObjectKeys, cartItemObjects, increaseTotalPriceOfCartItems
    constructor(){
        super();
    }
    render(){
        return <div className="checkout-detailed">
            <span className='cart-title-checkout'>CART</span>
            <div className="cart-item-object-cont">
                {this.props.cartItemObjectKeys.length>0 && this.props.cartItemObjectKeys.map((cartItemKey, index) =>  
                    <div key={index} className="cart-item-object">
                        <CheckoutItemInCart 
                        betterPrices={this.props.betterPrices}
                        changeSpecificItemAmount={this.props.changeSpecificItemAmount} rebuildCart={this.props.rebuildCart} cartItemObjectKeys={this.props.cartItemObjectKeys}
                        cartItemObjects={this.props.data} changeTotalPriceOfCartItems={this.props.changeTotalPriceOfCartItems}
                        currentCurrency={this.props.currentCurrency} data={this.props.data[cartItemKey]}
                        totalItems={this.props.totalItems} key={index+1} />
                    </div>
                )
                }
            </div>
            <div className={`checkout-additional-info ${this.props.cartItemObjectKeys.length>0 ? "":"no-display"}`}>
                <div>
                <span className='generic-title-medium font-weight-400'>Tax 21%: </span>
                <span className='generic-title-medium'><strong>{this.props.currentCurrency['symbol']}{Number(((this.props.totalPriceOfCartItems)*21)/100).toFixed(2)}</strong></span>
                </div>
                <div className='generic-title-medium font-weight-400'>Quantity: <strong className='generic-title-medium'>{this.props.totalItems}</strong></div>
                <div className='generic-title-medium font-weight-400'>Total - Without Tax: <strong className='generic-title-medium'>{this.props.currentCurrency['symbol']}{Number(this.props.totalPriceOfCartItems).toFixed(2)}</strong></div>
            </div>
            <button className={`green-button-style order-button ${this.props.cartItemObjectKeys.length>0 ? "":"no-display"}`}>ORDER</button>
        </div>
    }
}
export default Checkout;