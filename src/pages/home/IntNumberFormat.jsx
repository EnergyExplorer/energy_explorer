import React from 'react'

// function toPercentage(render, percentage) {
//   return (value) => render((value * 100).toFixed(0) + "%", percentage(value));
// }

// function withUnit(unit, render) {

// }

export const IntNumberFormat = ({ value, unit }) => {
  const formatter = new Intl.NumberFormat()
  return `${formatter.format(value)} ${unit}`
}



// withUnit(
//   "M.CHF",
//   indicate,
//   getPercentCalculator(minMaxCost),
//   'large'
// )
