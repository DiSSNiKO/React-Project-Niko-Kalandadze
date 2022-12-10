import React from 'react';
import AttributeForCheckout from '../attribute for checkout/AttributeForCheckout';

class AttributeContForCheckout extends React.Component {
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
        return <div className={`attribute-wrapper-small`}>
            <div className={`cart-item-title`}>{this.props.item['name'].toUpperCase()}:</div>
            <div className='sizes-colors'>
                {this.props.item['items'].map((attribute, index) => <AttributeForCheckout highlightedAttributes={this.props.highlightedAttributes} attribute={attribute} type={this.props.item['id']} key={index} />)}
            </div>
        </div>
    }
}
export default AttributeContForCheckout;