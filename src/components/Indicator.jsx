import { Tag } from 'antd'
import React from 'react'
import { getPercentCalculator } from '../utils/getPercentCalculator'
import styles from './Indicator.module.css'

export const Indicator = ({
  minMax,
  hasInvertedPercent = false,
  value,
  size = 'small',
  children,
  isTag
}) => {
  const percent = getPercentCalculator(minMax, hasInvertedPercent)(value)
  const color = 220 - 20 * (percent / 100);
  const backgroundColor = `hsl(${color}, ${percent * 0.7 + 30}%, 50%)`
  const className = `${styles.child} ${styles[size]}`

  if (isTag) {
    return <Tag
      className={`${className} ${styles.tag}`}
      color={backgroundColor}
    >
      {children}
    </Tag>
  }

  return (
    <div className={styles.parent}>
      <div
        style={{ backgroundColor }}
        className={className}
      >
        {children}
      </div>
    </div>
  );
}
