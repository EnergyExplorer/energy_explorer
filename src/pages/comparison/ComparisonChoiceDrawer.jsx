import React from 'react'
import { Button, Drawer } from 'antd'
import RevealButton from '../../components/RevealButton'
import WeightIcon from '../../components/WeightIcon'
import ScenariosMiniView from './ScenariosMiniView'
import { useComparisonScenarios } from '../../hooks/useComparisonScenarios'
import { PageHeader } from '../home/PageHeader';
import ScenarioComparisonButton from '../home/ScenarioComparisonButton';

export const ComparisonChoiceDrawer = () => {
  const {
    selectedRowKeys,
    setSelectedRowKeys
  } = useComparisonScenarios()

  return (
    <RevealButton
      size='large'
      text={<b><WeightIcon/>{' '}Change comparison</b>}
      renderChildren={({ isVisible, hide }) => (
        <Drawer
          width={520}
          title={(
            <PageHeader
              title='Scenarios'
              level={3}
            >
              <ScenarioComparisonButton
                selectedRowKeys={selectedRowKeys}
                beforeNavigate={hide}
              />
            </PageHeader>
          )}
          open={isVisible}
          onClose={hide}
          mask={null}
          placement='right'
        >
          <ScenariosMiniView
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
          />
        </Drawer>
      )}
    />
  )
}
