import React from "react";
import CurrencySelectCont from "./CurrencySelectCont";
import CartOverlay from './CartOverlay';
import { Link } from 'react-router-dom';
class Navbar extends React.Component {
    constructor() {
        super();
        this.handleCategory = (e) => {
            const newCategory = e.target.textContent.toLowerCase();
            this.props.changeCategory(newCategory);
        }
        this.currentCategoryStyle = 'currentCategoryStyle';
    }
    componentDidUpdate() {
        if (this.props.currentCategory === '') {
            const newCategory = Object.keys(this.props.categories)[0];
            this.props.changeCategory(newCategory);
            this.props.setAllCategories(this.props.categories)
        }
    }
    render() {
        return <header>
            <div className="nav-links">
                {Object.keys(this.props.categories).map((qei, index) => {
                    return <Link rel="stylesheet" to={`/${qei}`} key={index * 12.2} className={this.props.currentCategory === `${qei}` ? this.currentCategoryStyle : ''} onClick={this.handleCategory.bind(this)}>{qei.toUpperCase()}</Link>
                })}
            </div>
            <img src="/images/a-logo.svg" alt="logo" id="central-logo" />
            <div className="cart-currency-func">

                <CurrencySelectCont changeTotalPriceOfCartItems={this.props.changeTotalPriceOfCartItems} currencies={this.props.currencies} popUpsClosed={this.props.popUpsClosed} setPopUpWindowsClosed={this.props.setPopUpWindowsClosed} currentCurrency={this.props.currentCurrency} changeCurrency={this.props.changeCurrency} />

                <CartOverlay changeTotalPriceOfCartItems={this.props.changeTotalPriceOfCartItems}
                    cartItemObjectKeys={this.props.cartItemObjectKeys} rebuildCart={this.props.rebuildCart} changeSpecificItemAmount={this.props.changeSpecificItemAmount}
                    totalPriceOfCartItems={this.props.totalPriceOfCartItems} totalItems={this.props.totalItems} popUpsClosed={this.props.popUpsClosed} cartItemObjects={this.props.cartItemObjects}
                    currentCurrency={this.props.currentCurrency} setPopUpWindowsClosed={this.props.setPopUpWindowsClosed}
                />

            </div>
        </header>
    }
}
export default Navbar;