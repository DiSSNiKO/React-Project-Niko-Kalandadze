import React from 'react';
import { Link } from 'react-router-dom';
import exchangeRates from '../utils/exchangeRates';
import ProductsInCart from './ProductsInCart';

class CartOverlay extends React.Component {
    constructor(){
        super();
        this.state = {
            cartOverlayDisplayed: false,
            totalPriceOfCartItems: 0, // in USD
            totalItems: 0 
        }
    }
    increaseTotalPriceOfCartItems(price){
        this.setState((prevState)=>({
            totalPriceOfCartItems: prevState.totalPriceOfCartItems + price,
            totalItems: prevState.totalItems + 1
        }));
    }
    decreaseTotalPriceOfCartItems(price){
        this.setState((prevState)=>({
            totalPriceOfCartItems: prevState.totalPriceOfCartItems - price,
            totalItems: prevState.totalItems - 1
        }));
    }
    handleClick(){
            if(this.state.cartOverlayDisplayed){
                this.setState({
                    cartOverlayDisplayed: false
                });
            } else {
                this.setState({
                    cartOverlayDisplayed: true
                });
                this.props.setPopUpWindowsClosed(false);
            }
    }
    componentDidUpdate(prevProps){
        if(this.props.popUpsClosed && this.props.popUpsClosed!=prevProps.popUpsClosed){
            this.setState({
                cartOverlayDisplayed: false
            });
        }
    }
    render(){
        return <div className="cart-button-overlay-wrapper cart-overlay-part">
            <div style={{position:"relative"}}>
                <img src="/images/Empty Cart.svg" alt="" id="cart-button" onClick={this.handleClick.bind(this)}/>
                <div className={`${this.state.totalItems===0 && "no-display"} total-items-in-cart`}>{this.state.totalItems<100?this.state.totalItems:99}</div>
            </div>
            <div className={`cart-overlay ${!this.state.cartOverlayDisplayed ? "no-display":""} cart-overlay-part`}>
                <span className="my-bag cart-overlay-part"><strong className='cart-overlay-part'>My Bag,</strong> {this.props.cartItemObjects.length} items</span>
                <ProductsInCart totalPriceOfCartItems={this.state.totalPriceOfCartItems} increaseTotalPriceOfCartItems={this.increaseTotalPriceOfCartItems.bind(this)} decreaseTotalPriceOfCartItems={this.decreaseTotalPriceOfCartItems.bind(this)} currentCurrency={this.props.currentCurrency} cartItemObjects={this.props.cartItemObjects}/>
                <div className='cart-overlay-wrapper cart-overlay-part'>
                    <span className='total-price-style cart-overlay-part'>Total</span>
                    <span className="total-price total-price-style cart-overlay-part">{this.props.currentCurrency[0]}{Number(this.state.totalPriceOfCartItems*exchangeRates[this.props.currentCurrency]).toFixed(2)}</span>
                </div>
                <div className="cart-overlay-wrapper cart-overlay-part">
                    <Link to={"/checkout"} className="to-checkout to-checkout-bag">VIEW BAG</Link>
                    <Link to={"/checkout"} className="to-checkout green-button-style">CHECK OUT</Link>
                </div>
            </div>
            <div className={`screen-dimmer ${!this.state.cartOverlayDisplayed ? "no-display":""} cart-overlay-part`}></div>
        </div>
    }
}
export default CartOverlay;