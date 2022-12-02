import React from 'react';

class Attribute extends React.Component {
    render() {
        return <div className='attribute-wrapper'>
            <div className='generic-title-small font-weight-700'>{this.props.item['name']}:</div>
            <div className='sizes-colors'>
                <div className='testerdiv'></div>
                <div className='testerdiv'></div>
                <div className='testerdiv'></div>
                <div className='testerdiv'></div>
            </div>
        </div>
    }
}
export default Attribute;