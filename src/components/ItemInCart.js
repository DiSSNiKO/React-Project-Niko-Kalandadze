import React from 'react';
import AttributeContForOverlay from './AttributeContForOverlay';
import exchangeRates from '../utils/exchangeRates';

class ItemInCart extends React.Component {
    constructor () {
        super();
        this.state = {
            amountToBuy: 1,
        }
        this.increaseAmount = () => {
            this.setState((prevState)=> ({
                amountToBuy: prevState.amountToBuy + 1
            }));
        }
        this.decreaseAmount = () => {
            this.setState((prevState)=> ({
                amountToBuy: prevState.amountToBuy - 1
            }));
        }
    }
    componentDidMount(){
        this.props.increaseTotalPriceOfCartItems(this.props.data['price']);
    }
    render(){
        return <div className="cart-item-wrapper cart-overlay-part">
            <div className='cart-item-attributes cart-overlay-part'>
            <div className='cart-overlay-part cart-item-info'>{this.props.data['name']}</div>
            <div className='cart-overlay-part cart-item-info'>{this.props.data["brand"]}</div>
            <div className='cart-overlay-part product-price cart-item-info'>{this.props.currentCurrency[0]}{Number(this.props.data["price"]*exchangeRates[this.props.currentCurrency]).toFixed(2)}</div>
            {this.props.data["attributes"].length != 0 && this.props.data["attributes"].map((item, index) => <AttributeContForOverlay highlightedAttributes={this.props.data['highlightedAttributes']} item={item} key={index} />)}
            </div>
            <div className="cart-overlay-part" style={{display:"flex"}}>
                <div className='increase-decrease cart-overlay-part'>
                    <button className='increase-amount cart-overlay-part' onClick={()=>{
                        this.increaseAmount();
                        this.props.increaseTotalPriceOfCartItems(this.props.data['price']);
                    }}>+</button>
                    <div className='buy-this-many cart-overlay-part'>{this.state.amountToBuy}</div>
                    <button className='increase-amount cart-overlay-part' onClick={()=>{
                        if(this.state.amountToBuy>1){
                            this.decreaseAmount();
                            this.props.decreaseTotalPriceOfCartItems(this.props.data['price']);
                        }
                    }}>-</button>
                </div>
                <div className='cart-item-image'>
                    <img className='cart-overlay-part' src={this.props.data["gallery"][0]} alt="" />
                </div>
            </div>
        </div>
    }
}
export default ItemInCart;