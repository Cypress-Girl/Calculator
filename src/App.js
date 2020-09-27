import React from "react";
import "./App.css"

class ButtonCComp extends React.Component {
    fReset = () => {
        console.log("fReset");
    }

    render() {
        return(
            <input type="button" value={this.props.value} onClick={this.fReset}/>
        )
    }
}

function ButtonEmptyComp(){
    return(
        <input type="button" disabled />
    )
}

class ButtonOpComp extends React.Component {
    clickOperation = () => {
        console.log("click Operation");
    }

    render() {
        return(
            <input type="button" value={this.props.value} onClick={this.clickOperation}/>
        )
    }
}

class ButtonResultComp extends React.Component {
    fResult = () => {
        console.log("click Result");
    }

    render() {
        return(
            <input type="button" value={this.props.value} onClick={this.fResult}/>
        )
    }
}

class ButtonDigitComp extends React.Component {
    clickDigit = () => {
        console.log("click Digit");
    }

    render() {
        return(
            <input type="button" value={this.props.value} onClick={this.clickDigit}/>
        )
    }
}

class App extends React.Component {
    render() {
        return (
            <div id="main-container">
                <section  id="display-container">
                    <textarea id="display" rows="1" value="" readOnly/><br/>
                    <textarea id="result" rows="1" value="0" readOnly/>
                </section>
                <section id="button-container">
                    <ButtonCComp value="C"/>
                    <ButtonEmptyComp />
                    <ButtonEmptyComp />
                    <ButtonOpComp value="+" />

                    <ButtonDigitComp value="7" className="digit" />
                    <ButtonDigitComp value="8" className="digit" />
                    <ButtonDigitComp value="9" className="digit" />
                    <ButtonOpComp value="-" />

                    <ButtonDigitComp value="4" className="digit" />
                    <ButtonDigitComp value="5" className="digit" />
                    <ButtonDigitComp value="6" className="digit" />
                    <ButtonOpComp value="*" />

                    <ButtonDigitComp value="1" className="digit" />
                    <ButtonDigitComp value="2" className="digit" />
                    <ButtonDigitComp value="3" className="digit" />
                    <ButtonOpComp value="/" />

                    <ButtonEmptyComp />
                    <ButtonDigitComp value="0" className="digit" />
                    <ButtonEmptyComp />
                    <ButtonResultComp value="=" />
                </section>
            </div>
        )
    }
}

export default App;
