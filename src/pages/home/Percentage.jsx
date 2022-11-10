import React, { useMemo } from 'react'

export const Percentage = ({ value }) => {
  const percentValue = useMemo(() => (value * 100).toFixed(0) + "%", [value])
  return <div>{percentValue}</div>
}
