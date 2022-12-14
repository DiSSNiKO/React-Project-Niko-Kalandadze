import Navbar from "./components/Navbar";
import React from "react";
import ProductDisplay from "./components/ProductDisplay";
import ProductDetailedDisplay from "./components/ProductPage";
import Checkout from './components/Checkout';
import { Route, Routes } from 'react-router-dom';

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            allCategories: {},
            currencies: {},
            currentCategory: '',
            currentCurrency: {},
            cartItemObjects: {},
            totalPriceOfCartItems: 0.00, // in USD
            totalItems: 0,
            staticDataFetched: false
        }
        this.addCartItem = (newCartItem, identifi) => {
            this.setState((prevState) => ({
                cartItemObjects: { ...prevState.cartItemObjects, [`${identifi}`]: newCartItem }
            }));
        }
        this.changeSpecificItemAmount = (identifi, num) => {
            let newAmount = this.state.cartItemObjects[identifi];
            newAmount['amount'] += num;
            this.setState((prevState) => ({
                cartItemObjects: { ...prevState.cartItemObjects, [`${identifi}`]: newAmount }
            }));
        }
        this.setAllCategories = (categories) => {
            this.setState({
                allCategories: categories
            });
        }
        this.rebuildCart = (newCartConfig) => {
            this.setState({
                cartItemObjects: newCartConfig
            });
        }
        this.changeCategory = (newCategory) => {
            this.setState({
                currentCategory: newCategory
            });
        }
        this.changeCurrency = (newCurrency) => {
            this.setState({
                currentCurrency: newCurrency
            });
        }
        this.activateLocalStorage = () => {
            this.setState({
                currentCategory: localStorage.getItem('currentCategory'),
                currentCurrency: JSON.parse(localStorage.getItem('currentCurrency')),
                cartItemObjects: JSON.parse(localStorage.getItem('cartItemObjects')),
                totalItems: Number(localStorage.getItem('totalItems')),
                totalPriceOfCartItems: Number(localStorage.getItem('totalPriceOfCartItems')),
                allCategories: JSON.parse(localStorage.getItem('allCategories')),
                currencies: JSON.parse(localStorage.getItem('currencies')),
                staticDataFetched: localStorage.getItem('staticDataFetched')
            });
        }
    }
    // It is better to have the central component fetch category and currency, as this data is used in a lot of different components (and is functionally static), the code is more stable and easy to  understand this way
    componentDidMount() {
        if (Object.keys(localStorage).includes('currentCurrency')) { //if one of the states is included in storage, then all of them are
            this.activateLocalStorage();
        } else {
            let betterCurrencyObject = {};
            this.props.client.query({
                query: this.props.gql`
                {
                    categories {
                        name
                    }
                    currencies {
                        symbol
                        label
                    }
                }
                `
            }).then(result => {
                let categoryStateObject = {};
                result.data.categories.forEach(categoryObj => {
                    categoryStateObject[categoryObj.name] = categoryObj.name;
                });
                result.data.currencies.forEach((curObject) => {
                    betterCurrencyObject[curObject.label] = {
                        'label': curObject.label,
                        'symbol': curObject.symbol
                    }
                });
                this.setState({
                    allCategories: categoryStateObject,
                    currencies: betterCurrencyObject,
                    currentCurrency: betterCurrencyObject[Object.keys(betterCurrencyObject)[0]],
                    staticDataFetched: true
                });
            });
        }
    }
    //and also total items
    changeTotalPriceOfCartItems() {
        let pricesum = 0;
        let itemsum = 0;
        const objectkeys = Object.keys(this.state.cartItemObjects);
        objectkeys.forEach((key) => {
            itemsum += this.state.cartItemObjects[key]["amount"];
            pricesum += this.state.cartItemObjects[key]['prices'].filter(priceObj => { return priceObj['currency']['label'] === this.state.currentCurrency['label'] })[0]['amount'] * this.state.cartItemObjects[key]["amount"];
        });
        this.setState({
            totalPriceOfCartItems: Number(pricesum).toFixed(2),
            totalItems: itemsum
        });
    }
    componentDidUpdate(prevProps, prevState) {

        if (Object.keys(this.state.cartItemObjects).length === 0 && this.state.totalPriceOfCartItems != 0) {
            this.changeTotalPriceOfCartItems();
        }
        if (prevState.currentCurrency != this.state.currentCurrency) {
            this.changeTotalPriceOfCartItems();
        }
        if (Object.keys(this.state.cartItemObjects).length != Object.keys(prevState.cartItemObjects).length) {
            this.changeTotalPriceOfCartItems();
        }

        //update localStorage
        Object.keys(this.state).forEach((stateousEntry) => {
            if (typeof (this.state[`${stateousEntry}`]) === 'object' || typeof (this.state[`${stateousEntry}`]) === 'array') {
                localStorage.setItem(stateousEntry, JSON.stringify(this.state[`${stateousEntry}`]));
            } else {
                localStorage.setItem(stateousEntry, this.state[`${stateousEntry}`]);
            }
        });
    }
    render() {
        if (this.state.staticDataFetched) {
            return <main className="MainCont">
                <button className='clear-localStorage' onClick={() => {
                    localStorage.clear();
                }}>Clear localStorage</button>
                <Navbar setAllCategories={this.setAllCategories.bind(this)} popUpsClosed={this.props.popUpsClosed}
                    changeCategory={this.changeCategory.bind(this)} categories={this.state.allCategories}
                    currencies={this.state.currencies}
                    currentCategory={this.state.currentCategory} currentCurrency={this.state.currentCurrency}
                    changeCurrency={this.changeCurrency} setPopUpWindowsClosed={this.props.setPopUpWindowsClosed}
                    cartItemObjects={this.state.cartItemObjects} changeSpecificItemAmount={this.changeSpecificItemAmount.bind(this)}
                    rebuildCart={this.rebuildCart.bind(this)} cartItemObjectKeys={Object.keys(this.state.cartItemObjects)}
                    totalPriceOfCartItems={this.state.totalPriceOfCartItems} totalItems={this.state.totalItems}
                    changeTotalPriceOfCartItems={this.changeTotalPriceOfCartItems.bind(this)}
                />
                <Routes>
                    {Object.keys(this.state.allCategories).map((path, index) => {
                        return <Route exact path={"/" + path} key={index} element={<ProductDisplay gql={this.props.gql} client={this.props.client}
                            displayCategory={path}
                            allCategories={Object.keys(this.state.allCategories)}
                            changeCategory={this.changeCategory.bind(this)}
                            cartItemObjects={this.state.cartItemObjects}
                            currentCurrency={this.state.currentCurrency}
                            addCartItem={this.addCartItem.bind(this)}
                            cartItemObjectKeys={Object.keys(this.state.cartItemObjects)}
                            changeSpecificItemAmount={this.changeSpecificItemAmount.bind(this)}
                            changeTotalPriceOfCartItems={this.changeTotalPriceOfCartItems.bind(this)} />} />
                    })}
                    {/*route for ALL category that also acts as a landing page*/}
                    <Route exact path="/" element={<ProductDisplay gql={this.props.gql} client={this.props.client}
                        displayCategory={Object.keys(this.state.allCategories)[0]}
                        changeCategory={this.changeCategory.bind(this)}
                        cartItemObjects={this.state.cartItemObjects}
                        currentCurrency={this.state.currentCurrency}
                        addCartItem={this.addCartItem.bind(this)}
                        cartItemObjectKeys={Object.keys(this.state.cartItemObjects)}
                        changeSpecificItemAmount={this.changeSpecificItemAmount.bind(this)}
                        changeTotalPriceOfCartItems={this.changeTotalPriceOfCartItems.bind(this)} />} />
                    <Route path="/checkout" element={<Checkout
                        totalPriceOfCartItems={this.state.totalPriceOfCartItems} totalItems={this.state.totalItems}
                        changeTotalPriceOfCartItems={this.changeTotalPriceOfCartItems.bind(this)}
                        currentCurrency={this.state.currentCurrency}
                        rebuildCart={this.rebuildCart.bind(this)} changeSpecificItemAmount={this.changeSpecificItemAmount.bind(this)}
                        data={this.state.cartItemObjects} cartItemObjectKeys={Object.keys(this.state.cartItemObjects)} />} />

                    {<Route path="/product/:id" element={<ProductDetailedDisplay
                        gql={this.props.gql}
                        client={this.props.client}
                        currentCurrency={this.state.currentCurrency}
                        cartItemObjects={this.state.cartItemObjects}
                        changeSpecificItemAmount={this.changeSpecificItemAmount.bind(this)}
                        changeTotalPriceOfCartItems={this.changeTotalPriceOfCartItems.bind(this)}
                        addCartItem={this.addCartItem.bind(this)} />} />}

                </Routes>
            </main>
        } else {
            return <div>Data is being fetched</div>
        }
    }
}

export default Main;
