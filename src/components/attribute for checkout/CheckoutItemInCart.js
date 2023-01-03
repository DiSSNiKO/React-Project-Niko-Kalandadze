import React from 'react';
import AttributeContForCheckout from './AttributeContForCheckout';
import objectToString from '../../utils/objectToString';



class CheckoutItemInCart extends React.Component {
    constructor() {
        super();
        this.state = {
            imageChanged: false,
            animImageCont: null,
            imageChanged: false,
            translatedBy: 0
        }
        this.increaseAmount = () => {
            this.props.changeSpecificItemAmount(`${this.props.data.name}${this.props.data.brand}${objectToString(this.props.data.highlightedAttributes)}`, 1)
        }
        this.decreaseAmount = () => {
            this.props.changeSpecificItemAmount(`${this.props.data.name}${this.props.data.brand}${objectToString(this.props.data.highlightedAttributes)}`, -1)
        }
    }
    handleImageChange = (isLeft) => {
        const lastImageIndex = this.props.data.gallery.length - 1;
        if (isLeft) {
            if (this.state.translatedBy != 0) {
                this.setState(prevState => ({
                    translatedBy: prevState.translatedBy + 100
                }));
            } else {
                this.setState({
                    translatedBy: lastImageIndex * -100
                });
            }
        } else {
            if (this.state.translatedBy != lastImageIndex * -100) {
                this.setState(prevState => ({
                    translatedBy: prevState.translatedBy - 100
                }));
            } else {
                this.setState({
                    translatedBy: 0
                });
            }
        }
        this.setState({
            imageChanged: true
        });
    }
    componentDidMount() {
        if (this.props.data.gallery.length > 1) {
            this.setState({
                animImageCont: document.querySelector(`.${(this.props.data.name + this.props.data.brand + objectToString(this.props.data.highlightedAttributes)).replace(/ /g, '')}imij`)
            });
        }
    }
    componentDidUpdate() {
        if (this.state.imageChanged === true) {
            this.state.animImageCont.style.transform = `translateX(${this.state.translatedBy.toString()}%)`;
            this.setState({
                imageChanged: false
            });
        }
    }
    render() {
        return <div className="checkout-item-wrapper">
            <div>
                <div className='attributes-product-name big-title'>{this.props.data['name']}</div>
                <div className='attributes-product-brand big-title'>{this.props.data['brand']}</div>
                <div className='generic-title-medium font-weight-700'>{this.props.currentCurrency['symbol']}{this.props.data['prices'].filter(priceObj => { return priceObj['currency']['label'] === this.props.currentCurrency['label'] })[0]['amount']}</div>
                {this.props.data['attributes'].length != 0 && this.props.data['attributes'].map((item, index) => <AttributeContForCheckout highlightedAttributes={this.props.data['highlightedAttributes']} item={item} key={index} />)}
            </div>
            <div className='image-n-inc-dec' style={{ display: "flex" }}>
                <div className='increase-decrease'>
                    <button className='increase-amount check-increase-decrease' style={{ marginTop: "12px !important" }} onClick={() => {
                        if (this.props.data.amount === 1) {
                            this.setState({
                                displayRemovePopup: "no-display"
                            })
                        }
                        this.increaseAmount();
                        this.props.changeTotalPriceOfCartItems();
                    }}>+</button>
                    <div className='buy-this-many '>{this.props.data.amount}</div>
                    <div style={{ position: "relative" }}>
                        <button className='decrease-amount check-increase-decrease' style={{ marginBottom: "12px !important" }} onClick={() => {
                            if (this.props.data.amount > 1) {
                                this.decreaseAmount();
                            } else if (this.props.data.amount === 1) {
                                let newCart = {};
                                this.props.cartItemObjectKeys.forEach((key) => {
                                    if (key !== `${this.props.data.name}${this.props.data.brand}${objectToString(this.props.data.highlightedAttributes)}`) {
                                        newCart[key] = this.props.cartItemObjects[key];
                                    }
                                });
                                this.props.rebuildCart(newCart);
                                this.setState({
                                    deleteOccured: true
                                });
                            }
                            this.props.changeTotalPriceOfCartItems();
                        }}>{this.props.data.amount === 1 ? "x" : "-"}</button>
                        <div className={`remove-from-cart ${this.props.data.amount === 1 ? "" : "no-display-opacity"}`}></div>
                    </div>
                </div>
                <div className='checkout-image-wrapper'>
                    <div className={`checkout-item-focused-image-changer-wrapper ${this.props.data.gallery.length > 1 ? '' : 'no-display'}`}>
                        <button style={{ marginRight: "10px" }} onClick={() => { this.handleImageChange(true) }}>{'<'}</button>
                        <button onClick={() => { this.handleImageChange(false) }}>{'>'}</button>
                    </div>
                    <div className={`anim-image-cont ${(this.props.data.name + this.props.data.brand + objectToString(this.props.data.highlightedAttributes)).replace(/ /g, '')}imij`}>
                        {this.props.data.gallery.map((sors, index) => {
                            return <img key={index} className={`useful-image-style`} src={sors} alt="" />
                        })}
                    </div>
                </div>
            </div>
        </div>
    }
}
export default CheckoutItemInCart;