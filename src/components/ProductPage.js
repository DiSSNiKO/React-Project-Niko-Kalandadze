import React from 'react';
import findSpecificData from "../utils/findSpecificData";
import ProductPageActual from './ProductPageActual';

class ProductDetailedDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            specificData:{},
            initialRender: true,
            focusedImage: null,
        }
    }
    setSpecificData(){
        // console.log(findSpecificData(this.props.data))
        this.setState({
            initialRender:false,
            specificData: findSpecificData(this.props.data)
        })
    }
    componentDidMount(){
        this.setSpecificData();
    }
    render() {
        return <div>
            {this.state.initialRender && <div></div>}
            {!this.state.initialRender && <ProductPageActual cartItemObjects={this.props.cartItemObjects} addCartItem={this.props.addCartItem} data={this.state.specificData} currentCurrency={this.props.currentCurrency}/>} 
        </div>
    }
}
export default ProductDetailedDisplay;