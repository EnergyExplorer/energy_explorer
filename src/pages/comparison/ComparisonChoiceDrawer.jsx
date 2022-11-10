import React from 'react'
import { Drawer } from 'antd'
import RevealButton from '../../components/RevealButton'
import WeightIcon from '../../components/WeightIcon'

export const ComparisonChoiceDrawer = () => (
  <RevealButton
    size='large'
    text={<b><WeightIcon/>{' '}Change scenarios</b>}
    renderChildren={({ isVisible, hide }) => (
      <Drawer
        title='Compare scenarios'
        open={isVisible}
        onClose={hide}
        mask={null}
        placement='right'
      >
        hello
      </Drawer>
    )}
  />
)
