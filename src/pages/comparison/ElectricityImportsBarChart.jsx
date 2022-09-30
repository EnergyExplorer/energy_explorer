import React, { useState, useCallback } from 'react'
import { Radio } from "antd";
import BarChart, { formatImportsMultipleScenarios } from "../../components/BarChart";
import styles from "./ComparisonPage.module.css";

const timesOfYear = [
  {
    label: "Winter",
    value: "winterValue",
  },
  {
    label: "Summer",
    value: "summerValue",
  },
  {
    label: "Year",
    value: "yearValue",
  },
];

const ElectricityImportsBarChart = ({ scenarioData }) => {
  const [timeOfYear, setTimeOfYear] = useState("yearValue");

  const onChangeRadio = useCallback(({ target }) => {
    setTimeOfYear(target.value);
  }, []);

  return (
    <section>
      <Radio.Group
        size="large"
        value={timeOfYear}
        onChange={onChangeRadio}
        className={styles['year-selector']}
      >
        {timesOfYear.map(({ value, label }) => (
          <Radio.Button key={value} value={value}>
            {label}
          </Radio.Button>
        ))}
      </Radio.Group>
      <BarChart
        series={formatImportsMultipleScenarios(scenarioData, timeOfYear)}
      />
    </section>
  )
}

export default ElectricityImportsBarChart
