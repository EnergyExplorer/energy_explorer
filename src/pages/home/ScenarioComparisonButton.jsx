import React from 'react';
import { Button, Tooltip } from 'antd';
import WeightIcon from '../../components/WeightIcon';
import { routes } from '../../routes';
import { useCallback } from 'react';
import { createSearchQuery } from '../../utils/url';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const ScenarioComparisonButton = ({
  selectedRowKeys,
  beforeNavigate
}) => {
  const navigate = useNavigate()

  const queryParams = useMemo(() => (
    selectedRowKeys.reduce((
      scenarios,
      scenario,
      index
    ) => ({
      ...scenarios,
      [`scenario_${index}`]: scenario
    }), {})
  ), [selectedRowKeys])

  const onClick = useCallback(() => {
    history.replaceState(
      queryParams,
      "Selected scenarios",
      createSearchQuery(queryParams)
    )
    if (beforeNavigate) {
      beforeNavigate()
    }
    navigate({
      pathname: routes.comparison(),
      search: createSearchQuery(queryParams)
    })
  }, [queryParams])

  const button = (
    <Button
      onClick={onClick}
      size='large'
      disabled={selectedRowKeys.length <= 1}>
      <b><WeightIcon/>{' '}Compare scenarios</b>
    </Button>
  )

  if (selectedRowKeys.length < 3) {
    return (
      <Tooltip title={<span>Select 2 or 3 scenarios to compare</span>}>
        {button}
      </Tooltip>
    )
  }

  return button
}
export default ScenarioComparisonButton
