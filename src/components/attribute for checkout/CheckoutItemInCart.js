import React from 'react';
import AttributeContForCheckout from './AttributeContForCheckout';
import exchangeRates from '../../utils/exchangeRates';
import objectToString from '../../utils/objectToString';

class CheckoutItemInCart extends React.Component {
    constructor () {
        super();
        this.increaseAmount = () => {
            this.props.changeSpecificItemAmount(`${this.props.data.name}${this.props.data.brand}${objectToString(this.props.data.highlightedAttributes)}`,1)
        }
        this.decreaseAmount = () => {
            this.props.changeSpecificItemAmount(`${this.props.data.name}${this.props.data.brand}${objectToString(this.props.data.highlightedAttributes)}`,-1)
        }
        this.state = {
            displayRemovePopup : 'no-display'
        };
    }
    componentDidMount(){
        if(this.props.data.amount===1){
            this.setState({
                displayRemovePopup:""
            })
        } else {
            this.setState({
                displayRemovePopup:"no-display  "
            })
        }
    }
    render(){
        return <div className="checkout-item-wrapper">
            <div>
                <div className='attributes-product-name big-title'>{this.props.data['name']}</div>
                <div className='attributes-product-brand big-title'>{this.props.data['brand']}</div>
                <div className='generic-title-medium font-weight-700'>{this.props.currentCurrency[0]}{Number(this.props.data['price']*exchangeRates[this.props.currentCurrency]).toFixed(2)}</div>
                {this.props.data['attributes'].length != 0 && this.props.data['attributes'].map((item, index) => <AttributeContForCheckout highlightedAttributes={this.props.data['highlightedAttributes']} item={item} key={index}/>)}
            </div>
            <div className='image-n-inc-dec' style={{display:"flex"}}>
                <div className='increase-decrease'>
                    <button className='increase-amount check-increase-decrease' style={{marginTop:"12px !important"}} onClick={()=>{
                        if(this.props.data.amount===1){
                            this.setState({
                                displayRemovePopup:"no-display"
                            })
                        }
                        this.increaseAmount();
                        this.props.increaseTotalPriceOfCartItems(this.props.data['price']);
                    }}>+</button>
                    <div className='buy-this-many '>{this.props.data.amount}</div>
                    <div style={{position:"relative"}}>
                        <button className='decrease-amount check-increase-decrease' style={{marginBottom:"12px !important"}} onClick={()=>{
                            if(this.props.data.amount===2){
                                this.setState({
                                    displayRemovePopup:""
                                })
                            }
                            if(this.props.data.amount>1){
                                this.decreaseAmount();
                            } else if(this.props.data.amount===1){
                                let newCart = {};
                                this.props.cartItemObjectKeys.forEach((key)=>{
                                    if(key!==`${this.props.data.name}${this.props.data.brand}${objectToString(this.props.data.highlightedAttributes)}`){
                                        newCart[key]=this.props.cartItemObjects[key];
                                    }
                                });
                                this.props.rebuildCart(newCart);
                            }
                            this.props.decreaseTotalPriceOfCartItems(this.props.data['price']);
                        }}>{this.state.displayRemovePopup ? "-":"x"}</button>
                        <div className={`remove-from-cart ${this.state.displayRemovePopup}`}></div>
                    </div>
                </div>
                <div className='checkout-image-wrapper'>
                    <img className='useful-image-style' src={this.props.data["gallery"][0]} alt="" />
                </div>
            </div>
        </div>
    }
}
export default CheckoutItemInCart;