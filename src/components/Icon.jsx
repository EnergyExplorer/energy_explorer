import React, { useMemo } from 'react'
import AntIcon, { ThunderboltFilled, CloudFilled, DollarOutlined } from '@ant-design/icons'
import { WeightSvg } from './WeightSvg'
import { SwissFlagSvg } from './SwissFlagSvg'
import { SvgIcon } from './SvgIcon'
import styles from './Icon.module.css'

export const Icon = ({ name, size, color }) => {
  const Svg = useMemo(() => {
    switch (name) {
      case 'co2':
        return <CloudFilled/>
      case 'money':
        return <DollarOutlined/>
      case 'thunder':
        return <ThunderboltFilled/>
      case 'switzerland':
        return <SwissFlagSvg/>
      case 'weight':
        return <WeightSvg/>
      default:
        break
    }
  }, [name])

  return (
    <AntIcon
      className={styles.icon}
      style={{ color }}
      component={
      () => (
        <SvgIcon size={size}>
          {Svg}
        </SvgIcon>
      )
    } />
  )
}
