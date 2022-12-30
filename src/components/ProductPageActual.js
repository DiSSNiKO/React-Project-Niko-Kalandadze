import React from 'react';
import SelectionImage from './SelectionImage';
import AttributeCont from './AttributeCont';
import objectsIdentical from '../utils/objectsIdentical';
import objectToString from '../utils/objectToString';

class ProductPageActual extends React.Component {
    constructor() {
        super();
        this.state = {
            focusedImage: null,
            existantCombination: false,
            allSelectedAttributes: {

            }
        }
    }
    changeAllSelectedAttributes = (typeKey, value) => {
        this.setState(prevState => ({
            allSelectedAttributes: {
                ...prevState.allSelectedAttributes,
                [`${typeKey}`]: value
            }
        }))
    }
    setFocusedImage = (newImage) => {
        this.setState({
            focusedImage: newImage
        });
    }
    componentDidMount() {
        this.cartItemIdentifier = `${this.props.data.name}${this.props.data.brand}${objectToString(this.props.data.name)}`;
        let attributesStateObject = {};
        if (this.props.data['attributes']) {
            this.props.data["attributes"].forEach(element => {
                attributesStateObject[element['id']] = element['items'][0]['value'];
            });
        }
        this.setState({
            focusedImage: this.props.data['gallery'][0],
            allSelectedAttributes: attributesStateObject
        });

    }
    componentDidUpdate(prevProps, prevState) {
        // window.scrollTo(0, 0);
        this.cartItemIdentifier = `${this.props.data.name}${this.props.data.brand}${objectToString(this.state.allSelectedAttributes)}`;
        console.log(this.cartItemIdentifier)
        let alreadyExists = false;
        const toAdd =
        {
            attributes: this.props.data["attributes"],
            brand: this.props.data["brand"],
            name: this.props.data['name'],
            price: this.props.data['prices'][0]['amount'], //price in dollars
            gallery: this.props.data['gallery'],
            highlightedAttributes: this.state.allSelectedAttributes
        };
        if (this.props.cartItemObjects.length != 0) {
            Object.keys(this.props.cartItemObjects).forEach((cartItemKey) => {
                if (toAdd.name === this.props.cartItemObjects[cartItemKey].name) { //to better performance, only compare product objects for the same product 
                    if (objectsIdentical(toAdd.highlightedAttributes, this.props.cartItemObjects[cartItemKey].highlightedAttributes) === true) {
                        alreadyExists = true;
                    }
                }
            })
        }
        if (alreadyExists) { //Ok, while re-renders are happening alreadyExists stays static (its either true or false per set of re-renders). The reason why this works is, if, for exmpl: alreadyExists===true,
            if (prevState.existantCombination !== this.state.existantCombination || prevState.existantCombination === false && this.state.existantCombination === false) { // ---> this if statement triggers and the second part is true (both states are indeed false), this changes state to true
                this.setState(() => ({ //since now the state is true, which is different from prevState, which is false, the state is changed again. As such, on the third rotation, both states are true, satisfying neither of the conditions for the if statement, thus avoiding an infinite loop.
                    existantCombination: true
                }));
            }
        } else {
            if (prevState.existantCombination !== this.state.existantCombination || prevState.existantCombination === true && this.state.existantCombination === true) {
                this.setState(() => ({
                    existantCombination: false
                }));
            }
        }
    }
    render() {
        return <div className="product-detailed-display">
            <div className='product-images-container'>
                <div className='image-selection thin-scrollbar-cstm'>
                    {this.props.data['gallery'].map((item, index) => <SelectionImage key={index} image={item} setFocusedImage={this.setFocusedImage.bind(this)} />)}
                </div>
                <div className='focused-image-wrapper'>
                    <img src={this.state.focusedImage} alt="" />
                </div>
            </div>
            <div className="product-attributes">
                <div className='attributes-product-name big-title'>{this.props.data.name}</div>
                <div className='attributes-product-title big-title'>{this.props.data.brand}</div>
                {this.props.data["attributes"].length != 0 && this.props.data["attributes"].map((item, index) => <AttributeCont changeAllSelectedAttributes={this.changeAllSelectedAttributes.bind(this)} location={"productPage"} item={item} key={index * 2} />)}
                <div className='price-cont attribute-wrapper'>
                    <div className='generic-title-small font-weight-700'>PRICE:</div>
                    <div className='generic-title-medium font-weight-700'>{this.props.currentCurrency['symbol']}{this.props.data['prices'].filter(priceObj => { return priceObj['currency']['label'] === this.props.currentCurrency['label'] })[0]['amount']}
                    </div>
                </div>
                <button className={`add-to-cart green-button-style ${this.state.existantCombination ? "in-cart" : ""} ${this.props.data['inStock'] ? "" : "not-in-stock"}`}
                    onClick={() => {
                        if (!this.state.existantCombination) {
                            this.props.addCartItem(
                                {
                                    id: this.props.data['id'],
                                    attributes: this.props.data["attributes"],
                                    brand: this.props.data["brand"],
                                    name: this.props.data['name'], //remove by matching a string made of name+brand+every selected attribute and removing it from in cart array
                                    gallery: this.props.data['gallery'],
                                    prices: this.props.data['prices'],
                                    highlightedAttributes: this.state.allSelectedAttributes,
                                    amount: 1
                                },
                                this.cartItemIdentifier
                            );
                        }
                    }}>{this.props.data['inStock'] ? `${this.state.existantCombination ? "ALREADY IN CART" : "ADD TO CART"}` : "OUT OF STOCK"}</button>
                <div className='product-description thin-scrollbar-cstm' dangerouslySetInnerHTML={{ __html: this.props.data.description }}></div>
            </div>
        </div>
    }
}
export default ProductPageActual;