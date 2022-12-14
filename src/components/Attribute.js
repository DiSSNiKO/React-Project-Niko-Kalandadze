import React from 'react';
//attribute object has a key of value and displayValue

class Attribute extends React.Component {
    constructor(){
        super();
        this.attributeStyles = {
            Size: [`mostAttribute mostAttributeBig`,'selectedMostAttribute'],
            Color: ['colorAttribute colorAttributeBig', 'selectedColorAttribute'],
            Capacity: [`mostAttribute mostAttributeBig`,'selectedMostAttribute'],
            "With USB 3 ports": [`mostAttribute mostAttributeBig`,'selectedMostAttribute'],
            "Touch ID in keyboard": [`mostAttribute mostAttributeBig`,'selectedMostAttribute'],
        }
        this.colorStyle = ''; 
    }
    componentDidMount(){
        this.props.type==="Color" ? this.colorStyle=this.props.attribute['value']:this.colorStyle="white";
    }
    render() {
        return <div style={{backgroundColor: this.colorStyle}} className={`${this.attributeStyles[this.props.type][0]} generalAttribute ${this.props.usableKey===this.props.isSelected ? this.attributeStyles[this.props.type][1]:""}`} onClick={()=>{
            if(this.props.location==="productPage"){
                this.props.setSelected(this.props.usableKey);
                this.props.changeAllSelectedAttributes(this.props.type, this.props.attribute['value']);
            }
        }}>
            {this.props.type!="Color" && this.props.attribute["value"]}
        </div>
    }
}
export default Attribute;