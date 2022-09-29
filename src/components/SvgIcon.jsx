import React from 'react'
import styles from './SvgIcon.module.css'

const SvgIcon = ({ children }) => (
  <span role="img" aria-label="upload" class={`anticon anticon-upload ${styles.svg}`} >
    {children}
  </span>
)

export default SvgIcon
