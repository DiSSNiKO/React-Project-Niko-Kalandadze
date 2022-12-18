import React from "react";
import ProductListing from './ProductListing';

class ProductDisplay extends React.Component {
    constructor() {
        super();
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
                                inStock={item[1]['inStock']}
                                title={item[1]['name']}
                                thumbnail={item[1]['gallery'][0]}
                                brand={item[1]['brand']}
                                sellFor={this.props.betterPrices[item[0]][this.props.currentCurrency['label']]}
                                currencySymbol={this.props.currentCurrency['symbol']}
                                addCartItem={this.props.addCartItem} 
                                cartItemObjectKeys={this.props.cartItemObjectKeys}
                                cartItemObjects={this.props.cartItemObjects}
                                changeSpecificItemAmount={this.props.changeSpecificItemAmount}
                                changeTotalPriceOfCartItems={this.props.changeTotalPriceOfCartItems}
                                fullData={item[1]} />
                        }
                    } else {
                        return <ProductListing key={index}
                            id={item[0]}
                            inStock={item[1]['inStock']}
                            title={item[1]['name']}
                            thumbnail={item[1]['gallery'][0]}
                            brand={item[1]['brand']}
                            sellFor={this.props.betterPrices[item[0]][this.props.currentCurrency['label']]}
                            currencySymbol={this.props.currentCurrency['symbol']}
                            addCartItem={this.props.addCartItem} 
                            cartItemObjectKeys={this.props.cartItemObjectKeys}
                            cartItemObjects={this.props.cartItemObjects}
                            changeSpecificItemAmount={this.props.changeSpecificItemAmount}
                            changeTotalPriceOfCartItems={this.props.changeTotalPriceOfCartItems}
                            fullData={item[1]} />
                    }
                })}
            </div>
        </div>
    }
}

export default ProductDisplay;