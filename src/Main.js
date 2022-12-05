import Navbar from "./components/Navbar";
import React from "react";
import ProductDisplay from "./components/ProductDisplay";
import ProductDetailedDisplay from "./components/ProductPage"
import { Route, Routes } from 'react-router-dom';

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            currenctCategory: 'all',
            currentCurrency: '$USD',
            cartItemObjects : []
        }
        this.addCartItem = (newCartItem) => {
            this.setState((prevState)=>({
                cartItemObjects: [...prevState.cartItemObjects, newCartItem]
            }));
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
    componentDidUpdate(){
        console.log(this.state.cartItemObjects)
    }
    render() {
        return <main className="MainCont">
            <Navbar popUpsClosed={this.props.popUpsClosed} changeCategory={this.changeCategory}
                currentCategory={this.state.currenctCategory} currentCurrency={this.state.currentCurrency}
                changeCurrency={this.changeCurrency} setPopUpWindowsClosed={this.props.setPopUpWindowsClosed}
                cartItemObjects={this.state.cartItemObjects}/>
            <Routes>
                {["/", "all", "clothes", "tech"].map((path, index) => <Route path={path} key={index} element={<ProductDisplay data={this.props.data} currentCategory={this.state.currenctCategory} currentCurrency={this.state.currentCurrency} />} />)}
                <Route path="/product/:id" element={<ProductDetailedDisplay data={this.props.data} currentCurrency={this.state.currentCurrency} addCartItem={this.addCartItem.bind(this)}/>}/>
            </Routes>
        </main>
    }
}

export default Main;
