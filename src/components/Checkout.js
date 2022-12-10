import React from 'react';
import exchangeRates from '../utils/exchangeRates';
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
                    <div className="cart-item-object">
                        <CheckoutItemInCart 
                        changeSpecificItemAmount={this.props.changeSpecificItemAmount} rebuildCart={this.props.rebuildCart} cartItemObjectKeys={this.props.cartItemObjectKeys}
                        cartItemObjects={this.props.data} increaseTotalPriceOfCartItems={this.props.increaseTotalPriceOfCartItems}
                        decreaseTotalPriceOfCartItems={this.props.decreaseTotalPriceOfCartItems}  setTotalPriceOfCartItems={this.props.setTotalPriceOfCartItems} 
                        currentCurrency={this.props.currentCurrency} data={this.props.data[cartItemKey]} key={index} />
                    </div>
                )
                }
            </div>
            <div className={`checkout-additional-info ${this.props.cartItemObjectKeys.length>0 ? "":"no-display"}`}>
                <div>
                <span className='generic-title-medium font-weight-400'>Tax 21%: </span>
                <span className='generic-title-medium'><strong>{this.props.currentCurrency[0]}{Number(((this.props.totalPriceOfCartItems*exchangeRates[this.props.currentCurrency])*21)/100).toFixed(2)}</strong></span>
                </div>
                <div className='generic-title-medium font-weight-400'>Quantity: <strong className='generic-title-medium'>{this.props.totalItems}</strong></div>
                <div className='generic-title-medium font-weight-400'>Total: <strong className='generic-title-medium'>{this.props.currentCurrency[0]}{Number(this.props.totalPriceOfCartItems*exchangeRates[this.props.currentCurrency]).toFixed(0)}</strong></div>
            </div>
            <button className={`green-button-style order-button ${this.props.cartItemObjectKeys.length>0 ? "":"no-display"}`}>ORDER</button>
        </div>
    }
}
export default Checkout;