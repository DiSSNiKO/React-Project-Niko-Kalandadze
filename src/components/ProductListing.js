import React from "react";
import { Link } from 'react-router-dom'

class ProductListing extends React.Component {
    constructor(){
        super()
    }
    render() {
        return <Link to={`/product/${this.props.id}`} className="product-listing">
            <div className={`${this.props.inStock ? "":"out-of-stock"} product-listing-wrapper-a`}>
                <div className={this.props.inStock ? "no-display":"out-of-stock-text"}>OUT OF STOCK</div>
                <div className="image-wrapper">
                    <img src={this.props.thumbnail} alt="thumb n nail" />
                </div>
                <div>
                    <span className="product-name">{this.props.title} {this.props.brand}</span>
                    <span className="product-price">{`${this.props.currencySymbol}${this.props.sellFor}`}</span>
                </div>
            </div>

        </Link>
    }
}
export default ProductListing;