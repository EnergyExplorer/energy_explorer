import React from 'react';
import { Button, Tooltip } from 'antd';
import WeightIcon from '../../components/WeightIcon';
import { routes } from '../../routes';

const ScenarioComparisonButton = ({ selectedRowKeys }) => {
  const queryParams = selectedRowKeys.reduce((
    scenarios,
    scenario,
    index
  ) => ({
    ...scenarios,
    [`scenario_${index}`]: scenario
  }), {})

  const button = <Button
    href={routes.comparison(queryParams)}
    size='large'
    disabled={selectedRowKeys.length <= 1}>
    <b><WeightIcon/>{' '}Compare scenarios</b>
  </Button>

  if (selectedRowKeys.length < 3) {
    return <Tooltip
      title={
        <span>Select 2 or 3 scenarios to compare</span>
      }
    >
      {button}
    </Tooltip>
  }

  return button
}
export default ScenarioComparisonButton
