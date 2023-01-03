import React from "react";
import ProductListing from './ProductListing';

class ProductDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productsData: []
        };
    }
    renderCategoryProducts() {
        let deita;
        this.props.client.query({
            query: this.props.gql`
            {
                category (input:{title:"${this.props.displayCategory}"}) {
                  name
                  products {
                    id
                    name
                    prices {
                      amount
                      currency {
                        label
                        symbol
                      }
                    }
                    inStock
                    gallery
                    description
                    category
                    brand
                    attributes {
                      id
                      name
                      type
                      items {
                        value
                        displayValue
                      }
                    }
                  }
                }
            }
            `
        }).then(response => {
            deita = response.data.category.products;
            this.setState({
                productsData: deita
            });
        });
    }
    componentDidMount() {
        this.setState({
            firstLoad: true
        });
    }
    componentDidUpdate(prevProps) {
        if (this.props.displayCategory != prevProps.displayCategory || (this.state.firstLoad && this.props.displayCategory != undefined)) {
            //works like a charm
            this.renderCategoryProducts();
            this.props.changeCategory(this.props.displayCategory);
            if (this.state.firstLoad) {
                this.setState({
                    firstLoad: false
                });
            }
        }
    }
    render() {
        if (Object.entries(this.props.currentCurrency).length > 0) { //if it's not an empty object
            return <div className="product-display">
                <h2 className="category-title">{this.props.displayCategory.toUpperCase()}</h2>
                <div className="product-listings">
                    {this.state.productsData.map((item, index) => {
                        return <ProductListing key={index}
                            id={item['id']}
                            inStock={item['inStock']}
                            title={item['name']}
                            thumbnail={item['gallery'][0]}
                            brand={item['brand']}
                            sellFor={item['prices'].filter(priceObj => { return priceObj['currency']['label'] === this.props.currentCurrency['label'] })[0]['amount']}
                            currencySymbol={this.props.currentCurrency['symbol']}
                            addCartItem={this.props.addCartItem}
                            cartItemObjectKeys={this.props.cartItemObjectKeys}
                            cartItemObjects={this.props.cartItemObjects}
                            changeSpecificItemAmount={this.props.changeSpecificItemAmount}
                            changeTotalPriceOfCartItems={this.props.changeTotalPriceOfCartItems}
                            fullData={item} />
                    })}
                </div>
            </div>
        }
    }
}

export default ProductDisplay;