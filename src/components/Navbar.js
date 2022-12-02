import React from "react";
import CurrencySelectCont from "./CurrencySelectCont";
import { Link } from 'react-router-dom';
class Navbar extends React.Component {
    constructor() {
        super();
        this.handleCategory = (e) => {
            const newCategory = e.target.textContent.toLowerCase();
            this.props.changeCategory(newCategory);

        }
        this.navbarStyling = () => {
            this.props.currentCategory === 'all' ? this.currentCategoryStyle[0] = 'currentCategoryStyle' : this.currentCategoryStyle[0] = ''
            this.props.currentCategory === 'clothes' ? this.currentCategoryStyle[1] = 'currentCategoryStyle' : this.currentCategoryStyle[1] = ''
            this.props.currentCategory === 'tech' ? this.currentCategoryStyle[2] = 'currentCategoryStyle' : this.currentCategoryStyle[2] = ''
        }
        this.currentCategoryStyle = ['currentCategoryStyle', '', ''];
    }
    componentDidUpdate() {
        this.navbarStyling();
    }
    render() {
        return <header>
            <div className="nav-links">
                <Link rel="stylesheet" to="/all" className={this.currentCategoryStyle[0]} onClick={this.handleCategory.bind(this)}>ALL</Link>
                <Link rel="stylesheet" to="/clothes" className={this.currentCategoryStyle[1]} onClick={this.handleCategory.bind(this)}>CLOTHES</Link>
                <Link rel="stylesheet" to="/tech" className={this.currentCategoryStyle[2]} onClick={this.handleCategory.bind(this)}>TECH</Link>
            </div>
            <img src="/images/a-logo.svg" alt="logo" id="central-logo" />
            <div className="cart-currency-func">
                <CurrencySelectCont popUpsClosed={this.props.popUpsClosed} currentCurrency={this.props.currentCurrency} changeCurrency={this.props.changeCurrency} />
                <img src="/images/Empty Cart.svg" alt="" id="cart-button" />
            </div>
        </header>
    }
}
export default Navbar;