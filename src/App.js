import "./styles.css";

import * as React from "react";
import Display from "./components/Display";
import Keyboard from "./components/Keyboard";

const operators = ["+", "-", "x", "/"];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const isOperator = /[x/+‑]/,
  endsWithOperator = /[x+-/]$/,
  endsWithSign = /\d[x/+‑]{1}‑$/,
  endsWithSignNeg = /\d[x/+-]{1,2}-$/;

const maxDig = 16;

const App = () => {
  const [input, setInput] = React.useState("0");
  const [calc, setCalc] = React.useState("");
  const [preview, setPreview] = React.useState("");
  const [evaluated, setEvaluated] = React.useState(false);

  const maxDigit = () => {
    setInput("Warning Digit Limit");
    setPreview(`${input}`);
    setTimeout(() => setInput(`${preview}`), 1000);
  };

  const handleClear = () => {
    setInput("0");
    setCalc("");
    setPreview("0");
    setEvaluated(false);
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
    setCalc(calc.slice(0, -1));
  };

  const handleEqual = () => {
    if (!input.includes("Limit")) {
      let expression = calc;
      while (endsWithOperator.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression
        .replace(/x/g, "*")
        .replace(/‑/g, "-")
        .replace("--", "+0+0+0+0+0+0+");
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
      setInput(answer.toString());
      setCalc(
        expression
          .replace(/x/g, "*")
          .replace(/-/g, "‑")
          .replace("+0+0+0+0+0+0+", "‑-")
          .replace(/(x|\/|\+)‑/, "$1-")
          .replace(/^‑/, "-") +
          "=" +
          answer
      );
      setEvaluated(true);
      setPreview(answer);
    }
  };

  const handleDecimal = () => {
    if (evaluated === true) {
      setEvaluated(false);
      setInput("0.");
      setCalc("0.");
    } else if (!input.includes(".") && !input.includes("Limit")) {
      setEvaluated(false);
      if (input.length > maxDig) {
        maxDigit();
      } else if (
        endsWithOperator.test(calc) ||
        (input === "0" && calc === "")
      ) {
        let newCalc = calc + "0.";
        setInput("0.");
        setCalc(`${newCalc}`);
      } else {
        let newInput = calc.match(/(-?\d+\.?\d*)$/)[0] + ".";
        let newCalc = calc + ".";
        setInput(`${newInput}`);
        setCalc(`${newCalc}`);
      }
    }
  };

  const changeSignNeg = (prev) => {
    setCalc(`${prev}`);
  };

  const handleNumber = (value) => {
    if (!input.includes("Limit")) {
      setEvaluated(false);
      if (input.length > maxDig) {
        maxDigit();
      } else if (evaluated) {
        setInput(`${value}`);
        value !== "0" ? setCalc(`${value}`) : setCalc("");
      } else {
        input === "0" || isOperator.test(input)
          ? setInput(`${value}`)
          : setInput(`${input}${value}`);
        input === "0" && value === "0"
          ? calc === ""
            ? setCalc(`${value}`)
            : setCalc(`${calc}`)
          : /([^.0-9]0|^0)$/.test(calc)
          ? changeSignNeg(calc.slice(0, -1) + value)
          : setCalc(`${calc}${value}`);
      }
    }
  };

  const handleOperator = (value) => {
    if (!input.includes("Limit")) {
      setInput(`${value}`);
      setEvaluated(false);
      if (evaluated) {
        setCalc(`${preview}${value}`);
      } else if (!endsWithOperator.test(calc)) {
        setPreview(`${calc}`);
        setCalc(`${calc}${value}`);
      } else if (!endsWithSign.test(calc)) {
        !endsWithSignNeg.test(calc) && value === "-"
          ? setCalc(`${calc}${value}`)
          : setCalc(`${preview}${value}`);
      } else if (value !== "-") {
        setCalc(`${preview}${value}`);
      }
    }
  };

  const handleClick = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((oper) => oper === value);

    switch (value) {
      case "AC":
        handleClear();
        break;
      case "C":
        handleBackspace();
        break;
      case "=":
        handleEqual();
        break;
      case ".":
        handleDecimal();
        break;
      case number:
        handleNumber(value);
        break;
      case operator:
        handleOperator(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <Display input={input} calc={calc} />
        <Keyboard handleClick={handleClick} />
      </div>
    </div>
  );
};

export default App;
