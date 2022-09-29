import React from 'react';
import { Button, Tooltip } from 'antd';
import WeightIcon from '../../components/WeightIcon';

const ScenarioComparisonButton = ({ selectedRowKeys }) => {
  if (selectedRowKeys.length === 0) {
    return null
  }

  const button = <Button
    size='large'
    disabled={selectedRowKeys.length <= 2}>
    <b><WeightIcon/>{' '}Compare scenarios</b>
  </Button>

  if (selectedRowKeys.length < 3) {
    return <Tooltip
      title={
        <span>Select {3 - selectedRowKeys.length} more scenarios to compare</span>
      }
    >
      {button}
    </Tooltip>
  }
}
export default ScenarioComparisonButton
