import React from 'react';
import AttributeContForOverlay from './AttributeContForOverlay';
import objectToString from '../utils/objectToString';

class ItemInCart extends React.Component {
    constructor () {
        super();
        this.increaseAmount = () => {
            this.props.changeSpecificItemAmount(`${this.props.data.name}${this.props.data.brand}${objectToString(this.props.data.highlightedAttributes)}`,1)
        }
        this.decreaseAmount = () => {
            this.props.changeSpecificItemAmount(`${this.props.data.name}${this.props.data.brand}${objectToString(this.props.data.highlightedAttributes)}`,-1)
        }
    }
    componentDidMount(){
        this.props.changeTotalPriceOfCartItems();
    }
    render(){
        return <div className="cart-item-wrapper cart-overlay-part">
            <div className='cart-item-attributes thin-scrollbar-cstm cart-overlay-part'>
            <div>
                <div className='cart-overlay-part cart-item-info'>{this.props.data['name']}</div>
                <div className='cart-overlay-part cart-item-info'>{this.props.data['brand']}</div>
                <div className='cart-overlay-part product-price cart-item-info'>{this.props.currentCurrency['symbol']}{this.props.betterPrices[this.props.data["id"]][this.props.currentCurrency['label']]}</div>
            </div>
            {this.props.data['attributes'].length !== 0 && this.props.data['attributes'].map((item, index) => <AttributeContForOverlay highlightedAttributes={this.props.data['highlightedAttributes']} item={item} key={index}/>)}
            </div>
            <div className='cart-overlay-part' style={{display:"flex"}}>
                <div className='increase-decrease cart-overlay-part'>
                    <button className='increase-amount cart-overlay-part' onClick={()=>{
                        this.increaseAmount();
                        this.props.changeTotalPriceOfCartItems();
                    }}>+</button>
                    <div className='buy-this-many cart-overlay-part'>{this.props.data.amount}</div>
                    <div style={{position:"relative"}}>
                        <button className='decrease-amount cart-overlay-part' onClick={()=>{
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
                            this.props.changeTotalPriceOfCartItems();
                        }}>{this.props.data['amount']===1 ? 'x':'-'}</button>
                        <div className={`remove-from-cart ${this.props.data['amount']===1 ? '':'no-display-opacity'}`}></div>
                    </div>
                </div>
                <div className='cart-item-image'>
                    <img className='cart-overlay-part' src={this.props.data["gallery"][0]} alt="" />
                </div>
            </div>
        </div>
    }
}
export default ItemInCart;