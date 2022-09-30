import { Menu } from 'antd'
import React from 'react'
import { useCallback } from 'react';

export const energyOutlookItems = [
  {
    label: 'Electricity Imports'
  },
  {
    label: 'Winter Summer Comparison'
  },
  {
    label: 'Monthy Energy Mix'
  }
].map((outlook, index) => ({ ...outlook, key: `${index}` }))

const EnergyOutlookMenu = ({ defaultSelectedKey, onSelect }) => {
  const onSelectHandler = useCallback(({ key }) => {
    onSelect(key)
  }, [])

  return (
    <Menu
      mode="inline"
      selectedKeys={[defaultSelectedKey]}
      onSelect={onSelectHandler}
      items={energyOutlookItems}
    />
  )
}

export default EnergyOutlookMenu
