import React from 'react'
import { List, Space, Typography } from 'antd'
import { Indicator } from '../../components/Indicator'
import { useScenarios } from '../../hooks/useScenarios'
import { IntNumberFormat } from '../home/IntNumberFormat'
import { Percentage } from '../home/Percentage'
import { ScenarioTitle } from '../home/ScenarioTitle'
import { ScenarioCheckbox } from './ScenarioCheckbox'

const ScenariosMiniView = ({ selectedRowKeys, setSelectedRowKeys }) => {
  const {
    scenarioSummary,
    minMaxCO2,
    minMaxCost,
    minMaxDomestic,
    minMaxTotal
  } = useScenarios()

  return (
    <List
      dataSource={scenarioSummary}
      renderItem={({ name, co2, cost, domestic, total }) => (
        <List.Item key={name}>
          <List.Item.Meta
            title={
              <Typography.Title level={5}>
                <ScenarioCheckbox
                  name={name}
                  onChange={setSelectedRowKeys}
                  selectedRowKeys={selectedRowKeys}
                />
                <ScenarioTitle name={name}/>
              </Typography.Title>
            }
            description={(
              <div>
                <Space>
                  <Indicator isTag value={co2} minMax={minMaxCO2} size='small'>
                    <IntNumberFormat value={co2} unit="MtCO2"/>
                  </Indicator>
                  <Indicator isTag value={cost} minMax={minMaxCost} size='large'>
                    <IntNumberFormat value={cost} unit="M.CHF"/>
                  </Indicator>
                  <Indicator
                    isTag
                    value={domestic}
                    minMax={minMaxDomestic}
                    size='small'
                    hasInvertedPercent
                  >
                    <Percentage value={domestic}/>
                  </Indicator>
                  <Indicator isTag value={total} minMax={minMaxTotal} size='large'>
                    <IntNumberFormat value={total} unit="GWh"/>
                  </Indicator>
                </Space>
                <br/>
                <br/>
              </div>
            )}
          />
        </List.Item>
      )}
    />
  )
}

export default ScenariosMiniView
