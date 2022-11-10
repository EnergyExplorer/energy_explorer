import { Checkbox } from 'antd'
import React from 'react'
import { useMemo } from 'react';
import { useCallback } from 'react';

export const ScenarioCheckbox = ({
  name,
  onChange,
  selectedRowKeys
}) => {
  const isSelected = useMemo(() =>
    !!selectedRowKeys.find(selectedRow => selectedRow === name),
    [selectedRowKeys]
  )

  const onChangeHandler = useCallback(({ target: { value } }) => {
    const newSelectedRows = isSelected
      ? selectedRowKeys.filter(scenarioName => scenarioName !== value)
      : [...selectedRowKeys, value]
    onChange(newSelectedRows)
  }, [isSelected, selectedRowKeys, onChange])

  return (
    <Checkbox
      checked={isSelected}
      value={name}
      onChange={onChangeHandler}
      disabled={(
        !isSelected
        && selectedRowKeys.length >= 3)}
    />
  )
}
