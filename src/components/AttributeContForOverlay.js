import React from 'react';
import AttributeForOverlay from './AttributeForOverlay';

class AttributeContForOverlay extends React.Component {
    constructor(){
        super();
        this.state = {
            isSelected:0
        }
    }
    setSelected = (newSelectedAttribute) => {
        this.setState({
            isSelected: newSelectedAttribute
        })
    }
    render() {
        return <div className={`${this.props.location==='productPage'?"attribute-wrapper-product-page":"attribute-wrapper-small"} cart-overlay-part`}>
            <div className={`${this.props.location==='productPage'?"generic-title-small":"cart-item-title"} cart-overlay-part`}>{this.props.item['name'].toUpperCase()}:</div>
            <div className='sizes-colors cart-overlay-part'>
                {this.props.item["items"].map((attribute, index) => <AttributeForOverlay highlightedAttributes={this.props.highlightedAttributes} attribute={attribute} type={this.props.item['id']} key={index} />)}
            </div>
        </div>
    }
}
export default AttributeContForOverlay;