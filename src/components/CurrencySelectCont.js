import React from "react";
import CurrencyList from "./CurrencyList";

class CurrencySelectCont extends React.Component {
    constructor() {
        super();
        this.state = {
            dropboxVisible: false,
            neededClasses: ['no-display-pseudo', ''],
        };
    }
    handleDropbox = () => {
        if (this.state.dropboxVisible === true) {
            this.setState({
                dropboxVisible: false,
                neededClass: ['no-display-pseudo', '']
            });
        } else {
            if (this.props.popUpsClosed === true) {
                this.setState({
                    dropboxVisible: true,
                    neededClasses: ['', 'selectArrowOn']
                });
                this.props.setPopUpWindowsClosed(false);
            }
        }
    }
    handleCurrencyChange = (e) => {
        const newCurrency = this.props.currencies[e.target.value];
        this.props.changeCurrency(newCurrency);
        this.setState({
            dropboxVisible: false,
            neededClasses: ['no-display-pseudo', '']
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.popUpsClosed && prevProps.popUpsClosed !== this.props.popUpsClosed) {
            this.setState({
                dropboxVisible: false,
                neededClasses: ['no-display-pseudo', '']
            });
        }
    }
    render() {
        if (Object.keys(this.props.currentCurrency).length !== 0) {
            return <div className="change-currency">
                <div className="selectButtonDiv">
                    <button className="initializeSelect chcur" onClick={this.handleDropbox.bind(this)}>{this.props.currentCurrency['symbol']}</button>
                    <div className={`selectArrow ${this.state.neededClasses[1]}`}></div>
                </div>
                <CurrencyList neededClasses={this.state.neededClasses} betterCurrencyObject={this.props.currencies} handleCurrencyChange={this.handleCurrencyChange.bind(this)} />
            </div>
        }
    }
}
export default CurrencySelectCont;