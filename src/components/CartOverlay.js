import React from 'react';
import { Link } from 'react-router-dom';
import ProductsInCart from './ProductsInCart';
import ItemInCart from './ItemInCart';

class CartOverlay extends React.Component {
    constructor(){
        super();
        this.state = {
            cartOverlayDisplayed: false
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
        return <div className="cart-button-overlay-wrapper">
            <img src="/images/Empty Cart.svg" alt="" id="cart-button" onClick={this.handleClick.bind(this)}/>
            <div className={`cart-overlay ${!this.state.cartOverlayDisplayed ? "no-display":""}`}>
                <span className="my-bag"><strong>My Bag,</strong> 3 items{/*this.props.amount of items*/}</span>
                <ProductsInCart />
                <div className='cart-overlay-wrapper'>
                    <span className='total-price-style'>Total</span>
                    <span className="total-price total-price-style">69Shabangs</span>
                </div>
                <div className="cart-overlay-wrapper">
                    <Link to={"/checkout"} className="to-checkout to-checkout-bag">VIEW BAG</Link>
                    <Link to={"/checkout"} className="to-checkout green-button-style">CHECK OUT</Link>
                </div>
            </div>
            <div className={`screen-dimmer ${!this.state.cartOverlayDisplayed ? "no-display":""}`}></div>
        </div>
    }
}
export default CartOverlay;