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
        return <div className={this.props.location==='productPage'?"attribute-wrapper-product-page":"attribute-wrapper-small"}>
            <div className={this.props.location==='productPage'?"generic-title-small":"cart-item-title"}>{this.props.item['name'].toUpperCase()}:</div>
            <div className='sizes-colors'>
                {this.props.item["items"].map((attribute, index) => <AttributeForOverlay attribute={attribute} type={this.props.item['id']} key={index} usableKey={index} isSelected={this.state.isSelected}/>)}
            </div>
        </div>
    }
}
export default AttributeContForOverlay;