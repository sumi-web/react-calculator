import React from "react";
import Button from "./Button"

const buttonData = [
  { id: 1, value: "AC", class: "allClear operation" },
  { id: 2, value: <i className="fas fa-backspace"></i>, class: "backSpace operation" },
  { id: 3, value: "%", class: "percent operation" },
  { id: 4, value: "/", class: "arithmetic operation" },
  { id: 5, value: "7", class: "arithmetic numbers" },
  { id: 6, value: "8", class: "numbers" },
  { id: 7, value: "9", class: "numbers" },
  { id: 8, value: "X", class: "arithmetic operation" },
  { id: 9, value: "4", class: "numbers" },
  { id: 10, value: "5", class: "numbers" },
  { id: 11, value: "6", class: "numbers" },
  { id: 12, value: "-", class: "arithmetic operation" },
  { id: 13, value: "1", class: "numbers" },
  { id: 14, value: "2", class: "numbers" },
  { id: 15, value: "3", class: "numbers" },
  { id: 16, value: "+", class: "arithmetic operation" },
  { id: 17, value: "" },
  { id: 18, value: "0", class: "numbers" },
  { id: 19, value: ".", class: "numbers" },
  { id: 20, value: "=", class: "total-operation" }
]

const ButtonContainer = ({ setNumber, calculateResult }) => {
  const handleCalculation = (e, btnValue) => {
    let arithmetic = e.currentTarget.name.slice(0, 10)
    let numbers = e.currentTarget.name
    let allClear = e.currentTarget.name.slice(0, 8)
    let backSpace = e.currentTarget.name.slice(0, 9)
    let operationTotal = e.currentTarget.name.slice(0, 15)
    const percent = e.currentTarget.name.slice(0, 7);

    // clearing the state
    if (allClear === "allClear") {
      setNumber([""])
    }

    // removing element from the state
    if (backSpace === "backSpace") {
      setNumber(prevState => {
        let newState = [...prevState];
        // if (prevState.length >= 2) {
        newState.pop()
        // }  
        return newState
      });
    };

    // adding into state
    if (numbers === "numbers" || arithmetic === "arithmetic") {
      setNumber(prevState => {
        let newState = [];
        // stopping from repetition of operation symbol coming in display
        if (isNaN(btnValue) && prevState.length <= 2 && !/^(^\s|\d+)$/.test(prevState.join(""))) {
          if (prevState[1] === btnValue) {
            newState = prevState[0] === "0" ? [...prevState] : ["0", ...prevState,]
            return newState
          } else {
            if (isNaN(btnValue)) {
              prevState.pop();
              newState = prevState[0] === "0" ? [...prevState, btnValue] : ["0", ...prevState, btnValue]
              return newState
            }
          }
        }
        newState = [...prevState, btnValue]
        return newState
      });
    };

    // inserting percentage value to last number or whole number 
    if (percent === "percent" || btnValue === "%") {
      let percValue = "";
      setNumber(prevState => {
        let prevValue = prevState.join("")
        if (!isNaN(prevValue)) {
          prevState = []
          percValue = String(prevValue / 100);
          prevState.push(percValue);
          return prevState;
        } else {
          let newState = [...prevState]
          let lastNumber = newState.pop();
          percValue = String(lastNumber / 100);
          newState.push(percValue);
          return newState
        }
      });
    }

    // total operation
    if (operationTotal === "total-operation") {
      calculateResult()
    }
  };

  return (
    <div className="button-container">
      {
        buttonData.map(data => <Button key={data.id} data={data} handleCalculation={handleCalculation} />)
      }
    </div>
  )
}

export default ButtonContainer