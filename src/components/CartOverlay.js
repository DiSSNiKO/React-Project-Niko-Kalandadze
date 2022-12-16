import React from 'react';
import { Link } from 'react-router-dom';
import ProductsInCart from './ProductsInCart';

class CartOverlay extends React.Component {
    constructor(){
        super();
        this.state = {
            cartOverlayDisplayed: false,
        }
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
                <div className={`${this.props.totalItems===0 && "no-display-opacity"} total-items-in-cart`}>{this.props.totalItems<100?this.props.totalItems:99}</div>
            </div>
            <div className={`cart-overlay ${!this.state.cartOverlayDisplayed ? "no-display-pseudo":""} cart-overlay-part`}>
                <span className="my-bag cart-overlay-part"><strong className='cart-overlay-part'>My Bag,</strong> {this.props.totalItems} items</span>
                <ProductsInCart betterPrices={this.props.betterPrices} cartItemObjectKeys={this.props.cartItemObjectKeys}  changeSpecificItemAmount={this.props.changeSpecificItemAmount} totalPriceOfCartItems={this.props.totalPriceOfCartItems} totalItems={this.props.totalItems} rebuildCart={this.props.rebuildCart} changeTotalPriceOfCartItems={this.props.changeTotalPriceOfCartItems} currentCurrency={this.props.currentCurrency} cartItemObjects={this.props.cartItemObjects}/>
                <div className='cart-overlay-wrapper cart-overlay-part'>
                    <span className='total-price-style cart-overlay-part'>Total</span>
                    <span className="total-price total-price-style cart-overlay-part">{this.props.currentCurrency['symbol']}{this.props.totalPriceOfCartItems}</span>
                </div>
                <div className="cart-overlay-wrapper cart-overlay-part">
                    <Link to={"/checkout"} className="to-checkout to-checkout-bag">VIEW BAG</Link>
                    <Link to={"/checkout"} className="to-checkout green-button-style">CHECK OUT</Link>
                </div>
            </div>
            <div className={`screen-dimmer ${!this.state.cartOverlayDisplayed ? "no-display-opacity":""} cart-overlay-part`}></div>
        </div>
    }
}
export default CartOverlay;