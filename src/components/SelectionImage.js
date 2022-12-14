import React from 'react';


class SelectionImage extends React.Component {
    render() {
        return <div className="selection-image-wrapper">
            <img className='useful-image-style' src={this.props.image} alt="" onClick={(e)=>{
                this.props.setFocusedImage(e.target.src)
            }}/>
        </div>
    }
}
export default SelectionImage;