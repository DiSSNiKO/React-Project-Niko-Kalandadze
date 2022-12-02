import React from "react";
import exchangeRates from "../utils/exchangeRates";
import ProductListing from './ProductListing';

class ProductDisplay extends React.Component {
    constructor() {
        super();
        this.normalizePrice = (price) => {
            price = Number(price);
            return Number((Math.round(price * 100) / 100).toFixed(2));
        }
    }
    render() {
        return <div className="product-display">
            <h2 className="category-title">{this.props.currentCategory}</h2>
            <div className="product-listings">
                {this.props.data.map((item, index) => {
                    if (this.props.currentCategory != 'all') {
                        if (item[1]['category'] === this.props.currentCategory) {
                            return <ProductListing key={index}
                                id={item[0]}
                                title={item[1]['name']}
                                thumbnail={item[1]['gallery'][0]}
                                brand={item[1]['brand']}
                                sellFor={Number(item[1]['prices'][0]['amount'] * exchangeRates[this.props.currentCurrency]).toFixed(2)}
                                currencySymbol={this.props.currentCurrency[0]} />
                        }
                    } else {
                        return <ProductListing key={index}
                            id={item[0]}
                            title={item[1]['name']}
                            thumbnail={item[1]['gallery'][0]}
                            brand={item[1]['brand']}
                            sellFor={Number(item[1]['prices'][0]['amount'] * exchangeRates[this.props.currentCurrency]).toFixed(2)}
                            currencySymbol={this.props.currentCurrency[0]} />
                    }
                })}
            </div>
        </div>
    }
}

export default ProductDisplay;