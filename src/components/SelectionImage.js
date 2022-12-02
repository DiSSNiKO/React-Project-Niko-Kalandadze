import React from 'react';


class SelectionImage extends React.Component {
    render() {
        return <div className="selection-image-wrapper">
            <img src={this.props.image} alt="" />
        </div>
    }
}
export default SelectionImage;