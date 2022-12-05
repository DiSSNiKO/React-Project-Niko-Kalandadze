import React from 'react';
import AttributeContForOverlay from './AttributeContForOverlay';
import exchangeRates from '../utils/exchangeRates';

class ItemInCart extends React.Component {
    constructor () {
        super();
    }
    render(){
        return <div className="cart-item-wrapper cart-overlay-part">
            <div className='cart-item-attributes cart-overlay-part'>
            <div>{this.props.data['name']}</div>
            <div>{this.props.data["brand"]}</div>
            <div>{this.props.currentCurrency[0]}{this.props.data["prices"][0]['amount']*exchangeRates[this.props.currentCurrency]}</div>
            {this.props.data["attributes"].length != 0 && this.props.data["attributes"].map((item, index) => <AttributeContForOverlay item={item} key={index} />)}
            </div>
            <div className="cart-overlay-part" style={{display:"flex"}}>
                <div className='increase-decrease cart-overlay-part'>
                    <button className='increase-amount cart-overlay-part'>+</button>
                    <div className='buy-this-many cart-overlay-part'>54</div>
                    <button className='increase-amount cart-overlay-part'>-</button>
                </div>
                <div className='cart-item-image'>
                    <img className='cart-overlay-part' src={this.props.data["gallery"][0]} alt="" />
                </div>
            </div>
        </div>
    }
}
export default ItemInCart;