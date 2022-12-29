import React from "react";
import CurrencyList from "./CurrencyList";

class CurrencySelectCont extends React.Component {
    constructor() {
        super();
        this.state = {
            currencies:{},
            curAvailabe : false,
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
        const newCurrency = this.state.currencies[e.target.value];
        this.props.changeCurrency(newCurrency);
        this.setState({
            dropboxVisible: false,
            neededClasses: ['no-display-pseudo', '']
        });
    }

    componentDidMount(){
        let betterCurrencyObject = {};
        this.props.client.query({
            query: this.props.gql `
            {
                currencies {
                    symbol
                    label
                }
            }
            `
        }).then(result => {
            result.data.currencies.forEach((curObject)=>{
                betterCurrencyObject[curObject.label]={
                    'label':curObject.label,
                    'symbol':curObject.symbol
                }
            });
            this.setState({
                currencies : betterCurrencyObject,
                curAvailabe : true
              });
          });
    }
    componentDidUpdate(prevProps) {
        if(Object.keys(this.props.currentCurrency).length===0 && this.state.curAvailabe){
            this.props.changeCurrency(this.state.currencies[Object.keys(this.state.currencies)[0]]);
        }
        if (this.props.popUpsClosed && prevProps.popUpsClosed!==this.props.popUpsClosed) {
            this.setState({
                dropboxVisible: false,
                neededClasses: ['no-display-pseudo', '']
            });
        }
    }
    render() {
        if(Object.keys(this.props.currentCurrency).length!==0){
            return <div className="change-currency">
            <div className="selectButtonDiv">
                <button className="initializeSelect chcur" onClick={this.handleDropbox.bind(this)}>{this.props.currentCurrency['symbol']}</button>
            <div className={`selectArrow ${this.state.neededClasses[1]}`}></div>
            </div>
                {this.state.curAvailabe===true ? <CurrencyList neededClasses={this.state.neededClasses} betterCurrencyObject={this.state.currencies} handleCurrencyChange={this.handleCurrencyChange.bind(this)}/> : <div></div>}
            </div>
        }
    }
}
export default CurrencySelectCont;