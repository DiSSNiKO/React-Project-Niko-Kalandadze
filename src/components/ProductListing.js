import React from "react";

class ProductListing extends React.Component {
    render() {
        return <div className="product-listing">
            <div className="product-listing-wrapper-div">
                <div className="image-wrapper">
                    <img src={this.props.thumbnail} alt="thumb n nail" />
                </div>
                <div>
                    <span className="product-name">{this.props.title}</span>
                    <span className="product-price">{`${this.props.currencySymbol}${this.props.sellFor}`}</span>
                </div>
            </div>
        </div>
    }
}
export default ProductListing;