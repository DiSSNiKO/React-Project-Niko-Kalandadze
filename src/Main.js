import Navbar from "./components/Navbar";
import React from "react";
import ProductDisplay from "./components/ProductDisplay";
import ProductDetailedDisplay from "./components/ProductPage"
import { Route, Routes } from 'react-router-dom';
import findSpecificData from "./utils/findSpecificData";
class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            currenctCategory: 'all',
            currentCurrency: '$USD'
        }
        this.changeCategory = (newCategory) => {
            console.log(this.state.currentCurrency)
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
    render() {
        return <main className="MainCont">
            <Navbar popUpsClosed={this.props.popUpsClosed} changeCategory={this.changeCategory}
                currentCategory={this.state.currenctCategory} currentCurrency={this.state.currentCurrency}
                changeCurrency={this.changeCurrency} />
            <Routes>
                {["/", "all", "clothes", "tech"].map((path, index) => <Route path={path} key={index} element={<ProductDisplay data={this.props.data} currentCategory={this.state.currenctCategory} currentCurrency={this.state.currentCurrency} />} />)}
                <Route path="product/:id" element={<ProductDetailedDisplay data={findSpecificData(this.props.data)} currentCurrency={this.state.currentCurrency} />}></Route>
            </Routes>
        </main>
    }
}

export default Main;
