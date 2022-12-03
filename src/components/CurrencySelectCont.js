import React from "react";
class CurrencySelectCont extends React.Component {
    constructor() {
        super();
        this.state = {
            dropboxVisible: false,
            neededClasses: ['select-currency-invisible', 'select-currency-label-invisible', ''],
        };
    }
    handleDropbox = () => {
        if (this.state.dropboxVisible === true) {
            this.setState({
                dropboxVisible: false,
                neededClasses: ['select-currency-invisible', 'select-currency-label-invisible', '']
            });
        } else {
            if(this.props.popUpsClosed===true){
                this.setState({    
                    dropboxVisible: true,
                    neededClasses: ['select-currency-visible', 'select-currency-label-visible', 'selectArrowOn']
                });
                this.props.setPopUpWindowsClosed(false);
                console.log('baaaah')
            }
        }
    }
    handleCurrencyChange = (e) => {
        const newCurrency = e.target.value;
        this.props.changeCurrency(newCurrency);
        this.setState({
            dropboxVisible: false,
            neededClasses: ['select-currency-invisible', 'select-currency-label-invisible', '']
        });
    }
    componentDidUpdate(prevProps) {
        if (this.props.popUpsClosed && prevProps.popUpsClosed!==this.props.popUpsClosed) {
            this.setState({
                dropboxVisible: false,
                neededClasses: ['select-currency-invisible', 'select-currency-label-invisible', '']
            });
        }
    }
    render() {
        return <div className="change-currency">
            <div className="selectButtonDiv">
                <button className="initializeSelect chcur" onClick={this.handleDropbox.bind(this)}>{this.props.currentCurrency[0]}</button>
                <div className={`selectArrow ${this.state.neededClasses[2]}`}></div>
            </div>
            <div className={`select-currency ${this.state.neededClasses[0]}`}>
                <label htmlFor="USDoption" className={`${this.state.neededClasses[1]} chcur`} >$ USD</label>
                <input type="radio" value="$USD" id="USDoption" className="option chcur" name="cur" onChange={this.handleCurrencyChange.bind(this)} />
                <label htmlFor="EURoption" className={`${this.state.neededClasses[1]} chcur`} >€ EUR</label>
                <input type="radio" value="€EUR" id="EURoption" className="option chcur" name="cur" onChange={this.handleCurrencyChange.bind(this)} />
                <label htmlFor="JPYoption" className={`${this.state.neededClasses[1]} chcur`} >¥ JPY</label>
                <input type="radio" value="¥JPY" id="JPYoption" className="option chcur" name="cur" onChange={this.handleCurrencyChange.bind(this)} />
            </div>
        </div>
    }
}
export default CurrencySelectCont;