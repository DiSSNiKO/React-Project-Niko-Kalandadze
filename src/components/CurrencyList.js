import React from 'react';

class CurrencyList extends React.Component {
    render(){
        return <div className={`select-currency ${this.props.neededClasses[0]}`}>
            {Object.entries(this.props.betterCurrencyObject).map((elem, index) => {
                return <label key={index} htmlFor={`${elem[1]['label']}option`}>{elem[1].symbol} {elem[1].label}</label>
            })}
            {Object.entries(this.props.betterCurrencyObject).map((elem, index) => {
                return <input key={index} type="radio" value={`${elem[1].label}`} id={`${elem[1]['label']}option`} className="option chcur" name="cur" onChange={(e)=>{this.props.handleCurrencyChange(e)}} />
            })}
        </div>
        }
}
export default CurrencyList;