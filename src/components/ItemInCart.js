import React from 'react';
import AttributeCont from './AttributeCont';
import Attribute from './Attribute';

class ItemInCart extends React.Component {
    constructor () {
        super();
    }
    render(){
        return <div className="cart-item-wrapper">
            <div className='cart-item-attributes'>

            </div>
            <div className='increase-decrease'>

            </div>
            <div className='cart-item-image'>
                <img src="https://thicc.mywaifulist.moe/waifus/262/4b68f7845a0ecef82fa9d0a77436c4fb0032814e38ef324a2ac924162b70267f_thumb.jpg" alt="" />
            </div>
        </div>
    }
}
export default ItemInCart;