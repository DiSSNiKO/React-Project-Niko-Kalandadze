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
            currenctCategory: 'all',
            currentCurrency: '$USD',
            cartItemObjects : {},
            totalPriceOfCartItems: 0, // in USD
            totalItems: 0 
        }
        this.addCartItem = (newCartItem, identifi) => {
            console.log(this.state.cartItemObjects)
            this.setState((prevState)=>({
                cartItemObjects: {...prevState.cartItemObjects, [`${identifi}`]:newCartItem}
            }));
        }
        this.changeSpecificItemAmount = (identifi, num) => {
            let newAmount = this.state.cartItemObjects[identifi];
            newAmount['amount']+=num;
            this.setState((prevState)=>({
                cartItemObjects: {...prevState.cartItemObjects, [`${identifi}`]:newAmount}
            }));
        }
        this.rebuildCart = (newCartConfig) => {
            this.setState({
                cartItemObjects: newCartConfig
            });
        }
        this.changeCategory = (newCategory) => {
            
            this.setState({
                currenctCategory: newCategory
            });
        }
        this.changeCurrency = (newCurrency) => {
            this.setState({
                currentCurrency: newCurrency
            });
        }
    }
    increaseTotalPriceOfCartItems(price){
        this.setState((prevState)=>({
            totalPriceOfCartItems: prevState.totalPriceOfCartItems + price,
            totalItems: prevState.totalItems + 1
        }));
    }
    decreaseTotalPriceOfCartItems(price){
        this.setState((prevState)=>({
            totalPriceOfCartItems: Math.abs(prevState.totalPriceOfCartItems - price),
            totalItems: prevState.totalItems - 1
        }));
    }
    render() {
        return <main className="MainCont">
            <Navbar popUpsClosed={this.props.popUpsClosed} changeCategory={this.changeCategory}
                currentCategory={this.state.currenctCategory} currentCurrency={this.state.currentCurrency}
                changeCurrency={this.changeCurrency} setPopUpWindowsClosed={this.props.setPopUpWindowsClosed}
                cartItemObjects={this.state.cartItemObjects} changeSpecificItemAmount={this.changeSpecificItemAmount.bind(this)}
                rebuildCart={this.rebuildCart.bind(this)} cartItemObjectKeys={Object.keys(this.state.cartItemObjects)}
                totalPriceOfCartItems={this.state.totalPriceOfCartItems} totalItems={this.state.totalItems}
                increaseTotalPriceOfCartItems={this.increaseTotalPriceOfCartItems.bind(this)}
                decreaseTotalPriceOfCartItems={this.decreaseTotalPriceOfCartItems.bind(this)}/>
            <Routes>
                {["/", "all", "clothes", "tech"].map((path, index) => <Route path={path} key={index} element={<ProductDisplay data={this.props.data} currentCategory={this.state.currenctCategory} currentCurrency={this.state.currentCurrency} />} />)}
                <Route path="/checkout" element={<Checkout 
                totalPriceOfCartItems={this.state.totalPriceOfCartItems} totalItems={this.state.totalItems}
                increaseTotalPriceOfCartItems={this.increaseTotalPriceOfCartItems.bind(this)}
                decreaseTotalPriceOfCartItems={this.decreaseTotalPriceOfCartItems.bind(this)}
                currentCurrency={this.state.currentCurrency}
                rebuildCart={this.rebuildCart.bind(this)} changeSpecificItemAmount={this.changeSpecificItemAmount.bind(this)}
                data={this.state.cartItemObjects} cartItemObjectKeys={Object.keys(this.state.cartItemObjects)} />}/>
                <Route path="/product/:id" element={<ProductDetailedDisplay data={this.props.data} currentCurrency={this.state.currentCurrency} cartItemObjects={this.state.cartItemObjects} addCartItem={this.addCartItem.bind(this)}/>}/>
            </Routes>
        </main>
    }
}

export default Main;
