import React, { useState } from "react";
import Display from "./Display"
import ButtonContainer from "./ButtonContainer"

const Calculator = () => {
  const [number, setNumber] = useState([""]);
  const [total, setTotal] = useState("");

  //calculating the result  
  const calculateResult = () => {
    const newNumber = number.map(item => item === "X" ? item = "*" : item);
    // creating stack for fot making expression from infix to postfix and postfix evaluation
    class Stack {
      items = [];
      push = (e) => this.items.push(e)
      pop = () => {
        if (this.items.length === 0) {
          return "Underflow"
        }
        return this.items.pop()
      }
      peek = () => (this.items[this.items.length - 1])
      isEmpty = () => (this.items.length === 0)
      printStack = () => (this.items.join(""))
    }
    // infix to postfix
    function infixToPostfix() {
      const precedence = {
        "*": 2,
        "/": 2,
        "+": 1,
        "-": 1
      }

      // iterating over given expression and creating new arrays incase if we get two or more digits in between operator
      const newExp = []
      let digit = ""
      newNumber.forEach(item => {
        if (item !== "") {
          if (precedence[item]) {
            if (digit) newExp.push(digit);
            newExp.push(item);
            digit = ""
          } else {
            digit += item
          }
        }
      });

      if (digit) newExp.push(digit);

      // stack to store operators
      const stack = new Stack();
      let result = []
      // const expression = str.split("")

      newExp.forEach((item) => {
        if (!isNaN(item)) {
          result.push(item)
        }
        else {
          // filling stack first time if stack empty or scanned operator has higher precedence than stacked operator
          if (stack.isEmpty() || precedence[item] > precedence[stack.peek()]) {
            stack.push(item)
          } else {
            // popping if scanned operator has higher precedence or equal than the stacked operator
            for (let i = stack.items.length - 1; i >= 0; i--) {
              if (precedence[stack.items[i]] >= precedence[item]) {
                let popItem = stack.pop()
                result.push(popItem)
              }
            }
            stack.push(item)
          }
        }
      })
      result = [...result, ...stack.items]
      return result
    }

    // evaluation of postfix Expression
    function expEvaluation(postExp) {
      // stack to store operands
      const stack = new Stack();

      // scanning expression
      postExp.forEach(item => {
        if (!isNaN(item)) {
          stack.push(item)
        } else {
          const operand1 = Number(stack.pop());
          const operand2 = Number(stack.pop());
          switch (item) {
            case "+":
              stack.push(operand2 + operand1)
              break;
            case "-":
              stack.push(operand2 - operand1)
              break;
            case "*":
              stack.push(operand2 * operand1)
              break;
            case "/":
              stack.push((operand2 / operand1).toFixed(4))
              break;
            default:
          }

        }
      });
      return stack.peek()
    }

    const postFixExp = infixToPostfix();
    const evaluatedResult = expEvaluation(postFixExp);
    setTotal(evaluatedResult);
  }

  return (
    <div className="calculator-container">
      <div className="calc-box">
        <Display number={number} total={total} />
        <ButtonContainer setNumber={setNumber} calculateResult={calculateResult} />
      </div>
    </div>
  )
}

export default Calculator
