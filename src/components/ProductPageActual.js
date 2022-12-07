import React from 'react';
import SelectionImage from './SelectionImage';
import exchangeRates from '../utils/exchangeRates';
import AttributeCont from './AttributeCont';
class ProductPageActual extends React.Component {
    constructor() {
        super();
        this.state = {
            focusedImage: null,
            existantCombination: false,
            allSelectedAttributes: {

            }
        }
    }
    changeAllSelectedAttributes = (typeKey, value) => {
        this.setState(prevState => ({
            allSelectedAttributes: {
                ...prevState.allSelectedAttributes,
                [`${typeKey}`]: value
            }
        }))
    }
    setFocusedImage = (newImage) => {
        this.setState({
            focusedImage: newImage
        });
    }
    componentDidMount() {
        let attributesStateObject = {};
        if(this.props.data['attributes']){
            this.props.data["attributes"].forEach(element => {
            attributesStateObject[element['id']]=element['items'][0]['value'];
            });
        }
        this.setState({
            focusedImage: this.props.data['gallery'][0],
            allSelectedAttributes: attributesStateObject
        });
        
    }
    componentDidUpdate(prevProps, prevState){
        let alreadyExists = false;
        const toAdd = 
        {
            attributes:this.props.data["attributes"],
            brand:this.props.data["brand"],
            name:this.props.data['name'],
            price:this.props.data['prices'][0]['amount'], //price in dollars
            gallery: this.props.data['gallery'],
            highlightedAttributes: this.state.allSelectedAttributes
        };
        const attributeCount = Object.keys(toAdd.highlightedAttributes).length;
        let similarityIndex = 0;
        if(this.props.cartItemObjects.length!=0){
            this.props.cartItemObjects.forEach((cartItemObject)=>{
                similarityIndex = 0;
                for(const key of Object.keys(cartItemObject.highlightedAttributes)){
                    if(cartItemObject.highlightedAttributes[key]===toAdd.highlightedAttributes[key]){
                        similarityIndex+=1;
                    }
                }
                if(similarityIndex===attributeCount){
                    alreadyExists=true;
                }
            })
        }
        if(alreadyExists){ //Ok, while re-renders are happening alreadyExists stays static (its either true or false per set of re-renders). The reason why this works is, if, for exmpl: alreadyExists===true,
            if(prevState.existantCombination!==this.state.existantCombination || prevState.existantCombination===false && this.state.existantCombination===false){ // ---> this if statement triggers and the second part is true (both states are indeed false), this changes state to true
                this.setState(()=>({ //since now the state is true, which is different from prevState, which is false, the state is changed again. As such, on the third rotation, both states are true, satisfying neither of the conditions for the if statement, thus avoiding an infinite loop.
                    existantCombination:true
                }));
            }
        } else {
            if(prevState.existantCombination!==this.state.existantCombination || prevState.existantCombination===true && this.state.existantCombination===true){
                this.setState(()=>({
                    existantCombination:false
                }));
            }
        }
    }
    render() {
        return <div className="product-detailed-display">
            <div className='image-selection'>
                {this.props.data['gallery'].map((item, index) => <SelectionImage key={index} image={item} setFocusedImage={this.setFocusedImage.bind(this)}/>)}
            </div>
            <div className='focused-image-wrapper'>
                <img src={this.state.focusedImage} alt="" />
            </div>
            <div className="product-attributes">
                <div className='attributes-product-name big-title'>{this.props.data.name}</div>
                <div className='attributes-product-title'>{this.props.data.brand}</div>
                {this.props.data["attributes"].length != 0 && this.props.data["attributes"].map((item, index) => <AttributeCont changeAllSelectedAttributes={this.changeAllSelectedAttributes.bind(this)} location={"productPage"} item={item} key={index * 2} />)}
                <div className='price-cont attribute-wrapper'>
                    <div className='generic-title-small font-weight-700'>PRICE:</div>
                    <div className='generic-title-medium font-weight-700'>{this.props.currentCurrency[0]}
                        {Number(this.props.data['prices'][0]['amount'] * exchangeRates[this.props.currentCurrency]).toFixed(2)}</div>
                </div>
                <button className={`add-to-cart green-button-style ${this.state.existantCombination ? "in-cart":""} ${this.props.data['inStock'] ? "":"not-in-stock"}`} 
                onClick={()=>{
                    if(!this.state.existantCombination){
                        this.props.addCartItem({
                            attributes:this.props.data["attributes"],
                            brand:this.props.data["brand"],
                            name:this.props.data['name'],
                            price:this.props.data['prices'][0]['amount'], //price in dollars
                            gallery: this.props.data['gallery'],
                            highlightedAttributes: this.state.allSelectedAttributes
                        });
                    }
                }}>{this.props.data['inStock'] ? `${this.state.existantCombination ? "ALREADY IN CART":"ADD TO CART"}`:"OUT OF STOCK"}</button>
                <div className='product-description' dangerouslySetInnerHTML={{__html: this.props.data.description}}></div>
            </div> 
        </div>
    }
}
export default ProductPageActual;