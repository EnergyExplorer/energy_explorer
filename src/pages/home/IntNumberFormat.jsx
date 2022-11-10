import React from 'react'

export const IntNumberFormat = ({ value, unit }) => {
  const formatter = new Intl.NumberFormat()
  return `${formatter.format(value)} ${unit}`
}
