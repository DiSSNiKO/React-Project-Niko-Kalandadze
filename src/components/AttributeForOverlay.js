import React from 'react';
//attribute object has a key of value and displayValue

class AttributeForOverlay extends React.Component {
    constructor(){
        super();
        this.state = {
            colorStyle : '',
            attributeStyles : {
                Size: [`mostAttribute mostAttributeSmall cart-overlay-part`,'selectedMostAttribute'],
                Color: ['colorAttribute colorAttributeSmall cart-overlay-part', 'selectedColorAttribute'],
                Capacity: [`mostAttribute mostAttributeSmall cart-overlay-part`,'selectedMostAttribute'],
                "With USB 3 ports": [`mostAttribute mostAttributeSmall cart-overlay-part`,'selectedMostAttribute'],
                "Touch ID in keyboard": [`mostAttribute mostAttributeSmall cart-overlay-part`,'selectedMostAttribute'],
            }
        } 
    }
    componentDidMount(){
        this.props.type==="Color" ? this.setState({colorStyle:this.props.attribute['value']}):this.setState({colorStyle:'white'});
    }
    render() {
        return <div style={{backgroundColor: this.state.colorStyle}} className={`cart-overlay-part ${this.state.attributeStyles[this.props.type][0]} static-attribute generalAttribute ${this.props.highlightedAttributes[this.props.type]===this.props.attribute['value'] ? this.state.attributeStyles[this.props.type][1]:""}`}>
            {this.props.type!="Color" && this.props.attribute["value"]}
        </div>
    }
}
export default AttributeForOverlay;