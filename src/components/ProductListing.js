import React from "react";
import { Link } from 'react-router-dom'
import objectToString from "../utils/objectToString";

class ProductListing extends React.Component {
    constructor(){
        super();
        this.allSelectedAttributes={};
    }
    getDefaultAttributes(array){
        array.forEach(attType => {
            this.allSelectedAttributes[attType.id]=attType['items'][0]['value'];
        });
        this.quickAddProduct = `${this.props.title}${this.props.brand}${objectToString(this.allSelectedAttributes)}`;
    }
    componentDidMount(){
        this.getDefaultAttributes(this.props.fullData.attributes);
    }
    render() {
        return <div className="product-listing-and-bfplp">
            <Link to={`/product/${this.props.id}`} className="product-listing">
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
            <div className="buy-from-plp" style={{backgroundColor: this.props.inStock ? "":"crimson"}} onClick={()=>{
                if(this.props.inStock){
                    let alreadyExists = false;
                this.props.cartItemObjectKeys.forEach(key=>{
                    if(key===this.quickAddProduct){
                        alreadyExists=true;
                    }
                })
                if(!alreadyExists){
                    this.props.addCartItem(
                        {
                            id:this.props.id,
                            attributes:this.props.fullData['attributes'],
                            brand:this.props.brand,
                            name:this.props.title, //remove by matching a string made of name+brand+every selected attribute and removing it from in cart array
                            gallery: this.props.fullData['gallery'],
                            highlightedAttributes: this.allSelectedAttributes,
                            amount: 1
                        },
                        this.quickAddProduct
                    );
                } else {
                    this.props.changeSpecificItemAmount(this.quickAddProduct, 1);
                }
                    this.props.changeTotalPriceOfCartItems();
                }
            }}>
                <img src="/images/Empty Cart Light.svg" alt="" style={{width:'50%',height:'50%'}}/>    
            </div>
        </div>    
    }
}
export default ProductListing;