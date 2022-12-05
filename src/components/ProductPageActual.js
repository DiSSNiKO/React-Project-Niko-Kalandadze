import React from 'react';
import SelectionImage from './SelectionImage';
import exchangeRates from '../utils/exchangeRates';
import AttributeCont from './AttributeCont';
class ProductPageActual extends React.Component {
    constructor() {
        super();
        this.state = {
            focusedImage: null,
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
        let attributesStateObject = {};
        if(this.props.data['attributes']){
            this.props.data["attributes"].forEach(element => {
            attributesStateObject[element['id']]=element['items'][0]['value'];
            });
        }
        this.setState({
            focusedImage: this.props.data['gallery'][0],
            allSelectedAttributes: attributesStateObject
        });
    }
    render() {
        return <div className="product-detailed-display">
            <div className='image-selection'>
                {this.props.data['gallery'].map((item, index) => <SelectionImage key={index} image={item} setFocusedImage={this.setFocusedImage.bind(this)}/>)}
            </div>
            <div className='focused-image-wrapper'>
                <img src={this.state.focusedImage} alt="" />
            </div>
            <div className="product-attributes">
                <div className='attributes-product-name big-title'>{this.props.data.name}</div>
                <div className='attributes-product-title'>{this.props.data.brand}</div>
                {this.props.data["attributes"].length != 0 && this.props.data["attributes"].map((item, index) => <AttributeCont changeAllSelectedAttributes={this.changeAllSelectedAttributes.bind(this)} location={"productPage"} item={item} key={index * 2} />)}
                <div className='price-cont attribute-wrapper'>
                    <div className='generic-title-small font-weight-700'>PRICE:</div>
                    <div className='generic-title-medium font-weight-700'>{this.props.currentCurrency[0]}
                        {Number(this.props.data['prices'][0]['amount'] * exchangeRates[this.props.currentCurrency]).toFixed(2)}</div>
                </div>
                <button className={`add-to-cart green-button-style ${this.props.data['inStock'] ? "":"not-in-stock"}`} 
                onClick={()=>{
                    this.props.addCartItem(
                        this.props.data
                    );
                }}>{this.props.data['inStock'] ? "ADD TO CART":"OUT OF STOCK"}</button>
                <div className='product-description' dangerouslySetInnerHTML={{__html: this.props.data.description}}></div>
            </div> 
        </div>
    }
}
export default ProductPageActual;