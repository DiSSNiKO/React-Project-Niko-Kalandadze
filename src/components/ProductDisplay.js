import React from "react";
import ProductListing from './ProductListing';

class ProductDisplay extends React.Component {
    constructor() {
        super();
        this.state = {
            productsData:[]
        };
    }
    renderCategoryProducts(prevProps){
        let isDifferent = false;
        let deita;
        this.props.client.query({
            query: this.props.gql `
            {
                category (input:{title:"${this.props.currentCategory}"}) {
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
        }).then(response=>{
            deita = response.data.category.products;
            if(this.state.productsData.length===0){
                this.setState({
                    productsData : deita
                });
            }
            else if(deita){
                if(prevProps.currentCategory!=this.props.currentCategory){
                    isDifferent=true;
                }
                if(isDifferent===true){
                    this.setState({
                        productsData : deita
                    });
                    
                }
            }
        });
        
    }
    componentDidMount(prevProps, prevState){
        this.renderCategoryProducts(prevProps);
    }
    componentDidUpdate(prevProps, prevState){
        this.renderCategoryProducts(prevProps);
    }
    render() {
        return <div className="product-display">
            <h2 className="category-title">{this.props.currentCategory.toUpperCase()}</h2>
            <div className="product-listings">
                {this.state.productsData.map((item, index) => {
                    return <ProductListing key={index}
                        id={item['id']}
                        inStock={item['inStock']}
                        title={item['name']}
                        thumbnail={item['gallery'][0]}
                        brand={item['brand']}
                        sellFor={item['prices'].filter( priceObj =>{return priceObj['currency']['label']===this.props.currentCurrency['label']})[0]['amount']}
                        currencySymbol={this.props.currentCurrency['symbol']}
                        addCartItem={this.props.addCartItem} 
                        cartItemObjectKeys={this.props.cartItemObjectKeys}
                        cartItemObjects={this.props.cartItemObjects}
                        changeSpecificItemAmount={this.props.changeSpecificItemAmount}
                        changeTotalPriceOfCartItems={this.props.changeTotalPriceOfCartItems}
                        fullData={item}/>
                })}
            </div>
        </div>
    }
}

export default ProductDisplay;