import React, { useCallback } from 'react'
import { Radio, Space, Typography } from "antd";
import { scenarioKeyToTitleMap } from "../../constants/scenarioKeyToTitleMap";
import { timesOfYear } from '../../constants/timeOfYear';
import styles from './SankyChartControls.module.css'

export const SankyChartControls = ({
  setTimeOfYear,
  timeOfYear
}) => {
  const onChangeRadio = useCallback(({ target }) => {
    setTimeOfYear(target.value);
  }, []);

  return (
    <Space className={styles.container} direction="vertical" size="large">
      <Radio.Group size="large" value={timeOfYear} onChange={onChangeRadio}>
        {timesOfYear.map(({ value, label }) => (
          <Radio.Button key={value} value={value}>
            {label}
          </Radio.Button>
        ))}
      </Radio.Group>
    </Space>
  )
}
