import React from "react";

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
            if(this.props.popUpsClosed===true){
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
        if (this.props.popUpsClosed && prevProps.popUpsClosed!==this.props.popUpsClosed) {
            this.setState({
                dropboxVisible: false,
                neededClasses: ['no-display-pseudo', '']
            });
        }
    }
    render() {
        return <div className="change-currency">
            <div className="selectButtonDiv">
                <button className="initializeSelect chcur" onClick={this.handleDropbox.bind(this)}>{this.props.currentCurrency['symbol']}</button>
                <div className={`selectArrow ${this.state.neededClasses[1]}`}></div>
            </div>
            <div className={`select-currency ${this.state.neededClasses[0]}`}>
                {Object.entries(this.props.currencies).map((elem, index) => {
                    return <label key={index} htmlFor={`${elem[1]['label']}option`}>{elem[1].symbol} {elem[1].label}</label>
                })}
                {Object.entries(this.props.currencies).map((elem, index) => {
                    return <input key={index} type="radio" value={`${elem[1].label}`} id={`${elem[1]['label']}option`} className="option chcur" name="cur" onChange={this.handleCurrencyChange.bind(this)} />
                })}
            </div>
        </div>
    }
}
export default CurrencySelectCont;