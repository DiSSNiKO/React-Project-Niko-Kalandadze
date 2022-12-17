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
            currentCategory: 'all',
            currentCurrency: {
                'label':'USD',
                'symbol':'$'
            },
            cartItemObjects : {},
            totalPriceOfCartItems: 0.00, // in USD
            totalItems: 0 
        }
        this.addCartItem = (newCartItem, identifi) => {
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
                currenctCurrency: JSON.parse(localStorage.getItem('currentCurrency')),
                cartItemObjects: JSON.parse(localStorage.getItem('cartItemObjects')),
                totalItems: Number(localStorage.getItem('totalItems')),
                totalPriceOfCartItems: Number(localStorage.getItem('totalPriceOfCartItems'))
            });
        }
    }
    componentDidMount(){
        if(Object.keys(localStorage).length!=0){
            this.activateLocalStorage();
        }
    }
    //and also total items
    changeTotalPriceOfCartItems(){
        let pricesum = 0;
        let itemsum = 0;
        const objectkeys = Object.keys(this.state.cartItemObjects);
        objectkeys.forEach((key)=>{
            pricesum+=this.props.betterPrices[this.state.cartItemObjects[key]["id"]][this.state.currentCurrency['label']]*this.state.cartItemObjects[key]["amount"];
            itemsum+=this.state.cartItemObjects[key]["amount"];
        });
        this.setState({
            totalPriceOfCartItems: Number(pricesum).toFixed(2),
            totalItems: itemsum
        });
    }
    componentDidUpdate(prevProps, prevState){
        if(Object.keys(this.state.cartItemObjects).length===0 && this.state.totalPriceOfCartItems!=0){
            this.changeTotalPriceOfCartItems();
        }
        if(prevState.currentCurrency!=this.state.currentCurrency){
            this.changeTotalPriceOfCartItems();
        }
        if(Object.keys(this.state.cartItemObjects).length!=Object.keys(prevState.cartItemObjects).length){
            this.changeTotalPriceOfCartItems();
        }

        //update localStorage
        Object.keys(this.state).forEach((stateousEntry) => {
            if(typeof(this.state[`${stateousEntry}`])==='object'){
                localStorage.setItem(stateousEntry, JSON.stringify(this.state[`${stateousEntry}`]));
            } else {
                localStorage.setItem(stateousEntry, this.state[`${stateousEntry}`]);
            }
        });
        console.log(localStorage)
    }
    render() {
        return <main className="MainCont">
            <button className='clear-localStorage' onClick={()=>{
                localStorage.clear();
            }}>Clear localStorage</button>
            <Navbar popUpsClosed={this.props.popUpsClosed} currencies={this.props.currencies} changeCategory={this.changeCategory}
                currentCategory={this.state.currentCategory} currentCurrency={this.state.currentCurrency}
                changeCurrency={this.changeCurrency} setPopUpWindowsClosed={this.props.setPopUpWindowsClosed}
                cartItemObjects={this.state.cartItemObjects} changeSpecificItemAmount={this.changeSpecificItemAmount.bind(this)}
                rebuildCart={this.rebuildCart.bind(this)} cartItemObjectKeys={Object.keys(this.state.cartItemObjects)}
                totalPriceOfCartItems={this.state.totalPriceOfCartItems} totalItems={this.state.totalItems}
                changeTotalPriceOfCartItems={this.changeTotalPriceOfCartItems.bind(this)}
                betterPrices={this.props.betterPrices}/>
            <Routes>
                {["/", "all", "clothes", "tech"].map((path, index) => 
                
                <Route path={path} key={index} element={<ProductDisplay betterPrices={this.props.betterPrices} data={this.props.data} 
                currentCategory={this.state.currentCategory}
                cartItemObjects={this.state.cartItemObjects}
                currentCurrency={this.state.currentCurrency} 
                addCartItem={this.addCartItem.bind(this)} 
                cartItemObjectKeys={Object.keys(this.state.cartItemObjects)}
                changeSpecificItemAmount={this.changeSpecificItemAmount.bind(this)}
                changeTotalPriceOfCartItems={this.changeTotalPriceOfCartItems.bind(this)} />} />)}
                
                <Route path="/checkout" element={<Checkout 
                betterPrices={this.props.betterPrices}
                totalPriceOfCartItems={this.state.totalPriceOfCartItems} totalItems={this.state.totalItems}
                changeTotalPriceOfCartItems={this.changeTotalPriceOfCartItems.bind(this)}
                currentCurrency={this.state.currentCurrency}
                rebuildCart={this.rebuildCart.bind(this)} changeSpecificItemAmount={this.changeSpecificItemAmount.bind(this)}
                data={this.state.cartItemObjects} cartItemObjectKeys={Object.keys(this.state.cartItemObjects)} />}/>
                
                <Route path="/product/:id" element={<ProductDetailedDisplay betterPrices={this.props.betterPrices} data={this.props.data}
                currentCurrency={this.state.currentCurrency}
                cartItemObjects={this.state.cartItemObjects}
                addCartItem={this.addCartItem.bind(this)}/>}/>
            
            </Routes>
        </main>
    }
}

export default Main;
