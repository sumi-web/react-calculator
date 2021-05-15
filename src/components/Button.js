import React from "react";

const Button = ({ data, handleCalculation }) => {
  return (
    <button type="button" name={data.class} className={data.class} onClick={(e) => handleCalculation(e, data.value)} >{data.value}</button>
  )
}

export default Button