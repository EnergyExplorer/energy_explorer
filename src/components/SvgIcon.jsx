import React from 'react'
import styles from './SvgIcon.module.css'

export const SvgIcon = ({ children, size = 'default' }) => (
  <span
    role="img"
    aria-label="upload"
    className={
      `anticon anticon-upload
      ${styles.svg}
      ${styles[`size-${size}`]}`
    }
  >
    {children}
  </span>
)
