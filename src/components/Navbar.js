import React from "react";
import CurrencySelectCont from "./CurrencySelectCont";

class Navbar extends React.Component {
    constructor() {
        super();
        this.handleCategory = (e) => {
            e.preventDefault();
            const newCategory = e.target.textContent.toLowerCase();
            this.props.changeCategory(newCategory);
            document.querySelector('.category-title').scrollIntoView();
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
                <a rel="stylesheet" href="" className={this.currentCategoryStyle[0]} onClick={this.handleCategory.bind(this)}>ALL</a>
                <a rel="stylesheet" href="" className={this.currentCategoryStyle[1]} onClick={this.handleCategory.bind(this)}>CLOTHES</a>
                <a rel="stylesheet" href="" className={this.currentCategoryStyle[2]} onClick={this.handleCategory.bind(this)}>TECH</a>
            </div>
            <img src="images/a-logo.svg" alt="logo" id="central-logo" />
            <div className="cart-currency-func">
                <CurrencySelectCont popUpsClosed={this.props.popUpsClosed} currentCurrency={this.props.currentCurrency} changeCurrency={this.props.changeCurrency} />
                <img src="images/Empty Cart.svg" alt="" id="cart-button" />
            </div>
        </header>
    }
}
export default Navbar;