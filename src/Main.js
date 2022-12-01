import Navbar from "./components/Navbar";
import React from "react";
import ProductDisplay from "./components/ProductDisplay";
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

            <ProductDisplay data={this.props.data} currentCategory={this.state.currenctCategory} currentCurrency={this.state.currentCurrency} />

        </main>
    }
}

export default Main;
