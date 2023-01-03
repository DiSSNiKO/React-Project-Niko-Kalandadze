import React from 'react';
import findSpecificData from "../utils/findSpecificData";
import ProductPageActual from './ProductPageActual';

class ProductDetailedDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            specificData: {},
            initialRender: true,
            focusedImage: null,
        }
    }
    setSpecificData() {
        this.setState({
            initialRender: false,
            specificData: findSpecificData(this.props.data)
        })
    }
    componentDidMount() {
        const productId = window.location.pathname.slice(9); //slices off the href and /product part of the URL, thus only ID is left
        this.props.client.query({
            query: this.props.gql`
            {
                product(id:"${productId}") {
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
            `
        }).then(result => {
            if (result.data.product != null) { //If it's not null, the ID is valid
                this.setState({
                    specificData: result.data.product,
                    initialRender: false
                });
            }
        });
    }
    render() {
        return <div>
            {this.state.initialRender && <div></div>}
            {!this.state.initialRender && <ProductPageActual changeTotalPriceOfCartItems={this.props.changeTotalPriceOfCartItems} changeSpecificItemAmount={this.props.changeSpecificItemAmount} cartItemObjects={this.props.cartItemObjects} addCartItem={this.props.addCartItem} data={this.state.specificData} currentCurrency={this.props.currentCurrency} />}
        </div>
    }
}
export default ProductDetailedDisplay;