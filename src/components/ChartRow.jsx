import React from 'react'
import styles from './ChartRow.module.css'

export const ChartRow = ({ children }) => (
  <div className={styles["chart-section"]}>
    {children}
  </div>
)
