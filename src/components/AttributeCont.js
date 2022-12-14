import React from 'react';
import Attribute from './Attribute';

class AttributeCont extends React.Component {
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
        return <div className="attribute-wrapper-product-page">
            <div className="generic-title-small">{this.props.item['name'].toUpperCase()}:</div>
            <div className='sizes-colors'>
                {this.props.item["items"].map((attribute, index) => <Attribute changeAllSelectedAttributes={this.props.changeAllSelectedAttributes} location={this.props.location} setSelected={this.setSelected.bind(this)} attribute={attribute} type={this.props.item['id']} key={index} usableKey={index} isSelected={this.state.isSelected}/>)}
            </div>
        </div>
    }
}
export default AttributeCont;