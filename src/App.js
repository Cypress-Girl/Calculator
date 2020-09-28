import React from "react";
import "./App.css"

class ButtonComp extends React.Component {
    constructor(props) {
        super(props);
        this.onInputClick = this.onInputClick.bind(this);
    }

    onInputClick() {
        if (this.props.onClick)
            this.props.onClick(this.props.value);
    }

    render() {
        return (this.props.className === "digit") ?
            <input type="button" value={this.props.value} onClick={this.onInputClick} className="digit"/> :
            <input type="button" value={this.props.value} onClick={this.onInputClick}/>;
    }
}

function ButtonEmptyComp() {
    return (
        <input type="button" disabled/>
    )
}

function DisplayComp(props) {
    return (
        <textarea id={props.id} rows="1" value={props.value} readOnly/>
    )
}

const SIGN = 0;
const DIGIT = 1;
const NEED_RESET = 2;

let op = "";
let lastSymbol = DIGIT;
let inputNumber = "";
let resultExp = 0;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayText: "",
            result: 0,
        }
    }

    needReset() {
        if (lastSymbol === NEED_RESET) {
            this.fReset();
        }
    }

    calcResult() {
        let tmpResult = 0;
        switch(op) {
            case "+":
                tmpResult = resultExp + Number(inputNumber);
                break;
            case "-":
                tmpResult = resultExp - Number(inputNumber);
                break;
            case "*":
                tmpResult = resultExp * Number(inputNumber);
                break;
            case "/":
                if(inputNumber === "0") {
                    return 'error';
                }
                tmpResult = resultExp / Number(inputNumber);
                break;
            case "":
                tmpResult = Number(inputNumber);
                break;
            default:
                break;
        }
        return tmpResult;
    }

    addTextInResultArea() {
        let res = this.calcResult();
        if (res === "error") {
            this.setState({
                result: "на ноль делить нельзя"
            })
            lastSymbol = NEED_RESET;
            return;
        }
        this.setState({
            result: `= ${res}`
        })
    }

    clickDigit = (inputSymbol) => {
        this.needReset();    //делаем reset, если нужно
        lastSymbol = DIGIT;

        inputNumber += inputSymbol;

        this.setState((s) => ({
            displayText: s.displayText + inputSymbol
        }), this.addTextInResultArea);
    }

    // в случае если после ввода операции снова ввели знак операции, а не цифру
    // изменяем знак последней введённой операции
    replaceOperationInDisplay(newOp){
        let s = this.state.displayText.slice(0, this.state.displayText.length-1);
        s += newOp;
        this.setState({
            displayText: s
        })
    }

    clickOperation = (operation) => {
        this.needReset();    //делаем reset, если нужно

        //проверка на второй знак операции подряд
        if (lastSymbol === SIGN) {
            op = operation;     //новоый знак операции
            this.replaceOperationInDisplay(op);
            return;
        }

        //вычисляем результат предыдущей операции
        lastSymbol = SIGN;
        resultExp = this.calcResult();

        //инициальзация новой операции
        op = operation;     //новоый знак операции
        this.setState((s) => ({
            displayText: s.displayText + op
        }));
        inputNumber = "";               //сброс введённого числа
    }

    fReset = () => {
        op = "";
        resultExp = 0;
        inputNumber = "";
        lastSymbol = DIGIT;

        this.setState({displayText: inputNumber})
        this.setState({result: 0})
    }

    fResult = () => {
        lastSymbol = NEED_RESET;
    }

    render() {
        return (
            <div id="main-container">
                <section id="display-container">
                    <DisplayComp id="display" value={this.state.displayText}/><br/>
                    <DisplayComp id="result" value={this.state.result}/><br/>
                </section>
                <section id="button-container">
                    <ButtonComp value="C" onClick={this.fReset}/>
                    <ButtonEmptyComp/>
                    <ButtonEmptyComp/>
                    <ButtonComp value="+" onClick={this.clickOperation}/>

                    <ButtonComp value="7" className="digit" onClick={this.clickDigit}/>
                    <ButtonComp value="8" className="digit" onClick={this.clickDigit}/>
                    <ButtonComp value="9" className="digit" onClick={this.clickDigit}/>
                    <ButtonComp value="-" onClick={this.clickOperation}/>

                    <ButtonComp value="6" className="digit" onClick={this.clickDigit}/>
                    <ButtonComp value="4" className="digit" onClick={this.clickDigit}/>
                    <ButtonComp value="5" className="digit" onClick={this.clickDigit}/>
                    <ButtonComp value="*" onClick={this.clickOperation}/>

                    <ButtonComp value="1" className="digit" onClick={this.clickDigit}/>
                    <ButtonComp value="2" className="digit" onClick={this.clickDigit}/>
                    <ButtonComp value="3" className="digit" onClick={this.clickDigit}/>
                    <ButtonComp value="/" onClick={this.clickOperation}/>

                    <ButtonEmptyComp/>
                    <ButtonComp value="0" className="digit" onClick={this.clickDigit}/>
                    <ButtonEmptyComp/>
                    <ButtonComp value="=" onClick={this.fResult}/>
                </section>
            </div>
        )
    }
}

export default App;
