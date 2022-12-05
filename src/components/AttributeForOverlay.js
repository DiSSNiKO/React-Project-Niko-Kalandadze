import React from 'react';
//attribute object has a key of value and displayValue

class AttributeForOverlay extends React.Component {
    constructor(){
        super();
        this.attributeStyles = {
            Size: [`mostAttribute mostAttributeSmall`,'selectedMostAttribute'],
            Color: ['colorAttribute colorAttributeSmall', 'selectedColorAttribute'],
            Capacity: [`mostAttribute mostAttributeSmall`,'selectedMostAttribute'],
            "With USB 3 ports": [`mostAttribute mostAttributeSmall`,'selectedMostAttribute'],
            "Touch ID in keyboard": [`mostAttribute mostAttributeSmall`,'selectedMostAttribute'],
        }
        this.colorStyle = ''; 
    }
    componentDidMount(){
        this.props.type==="Color" ? this.colorStyle=this.props.attribute['value']:this.colorStyle="white";
    }
    render() {
        return <div style={{backgroundColor: this.colorStyle}} className={`${this.attributeStyles[this.props.type][0]} generalAttribute ${this.props.usableKey===this.props.isSelected ? this.attributeStyles[this.props.type][1]:""}`}>
            {this.props.type!="Color" && this.props.attribute["value"]}
        </div>
    }
}
export default AttributeForOverlay;