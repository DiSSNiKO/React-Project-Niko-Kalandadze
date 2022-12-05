import React from 'react';
import { Link } from 'react-router-dom';
import ProductsInCart from './ProductsInCart';

class CartOverlay extends React.Component {
    constructor(){
        super();
        this.state = {
            cartOverlayDisplayed: false
        }
    }
    handleClick(e){
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
            <img src="/images/Empty Cart.svg" alt="" id="cart-button" onClick={this.handleClick.bind(this)}/>
            <div className={`cart-overlay ${!this.state.cartOverlayDisplayed ? "no-display":""} cart-overlay-part`}>
                <span className="my-bag cart-overlay-part"><strong className='cart-overlay-part'>My Bag,</strong> {this.props.cartItemObjects.length} items</span>
                <ProductsInCart currentCurrency={this.props.currentCurrency} cartItemObjects={this.props.cartItemObjects}/>
                <div className='cart-overlay-wrapper cart-overlay-part'>
                    <span className='total-price-style cart-overlay-part'>Total</span>
                    <span className="total-price total-price-style cart-overlay-part">69Shabangs</span>
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