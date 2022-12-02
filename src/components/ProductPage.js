import React from 'react';
import SelectionImage from './SelectionImage';
import exchangeRates from '../utils/exchangeRates';
import Attribute from './Attribute';

class ProductDetailedDisplay extends React.Component {
    constructor() {
        super();
        this.state = {
            focusedImage: null
        }
    }
    componentDidMount() {
        this.setState({
            focusedImage: this.props.data['gallery'][0]
        });
    }

    render() {
        return <div className="product-detailed-display">
            <div className='image-selection'>
                {this.props.data['gallery'].map((item, index) => <SelectionImage key={index} image={item} />)}
            </div>
            <div className='focused-image-wrapper'>
                <img src={this.state.focusedImage} alt="" />
            </div>
            <div className="product-attributes">
                <div className='attributes-product-name'>{this.props.data.name}</div>
                <div className='attributes-product-title'>{this.props.data.brand}</div>
                {this.props.data["attributes"].length != 0 && this.props.data["attributes"].map((item, index) => <Attribute item={item} key={index * 2} />)}
                <div className='price-cont attribute-wrapper'>
                    <div className='generic-title-small font-weight-700'>PRICE:</div>
                    <div className='generic-title-medium font-weight-700'>{this.props.currentCurrency[0]}
                        {this.props.data['prices'][0]['amount'] * exchangeRates[this.props.currentCurrency]}</div>
                </div>
            </div>
        </div>
    }
}
export default ProductDetailedDisplay;