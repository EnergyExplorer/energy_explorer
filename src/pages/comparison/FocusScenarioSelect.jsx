import React from "react";
import { Select } from "antd";
import { useMemo } from "react";
import styles from "./FocusScenarioSelect.module.css";
import { scenarioKeyToTitleMap } from "../../constants/scenarioKeyToTitleMap";

const FocusScenarioSelect = ({ scenarioData, value, onChange }) => {
  const options = useMemo(
    () =>
      scenarioData.map(({ name }) => ({
        label: scenarioKeyToTitleMap[name],
        value: name,
      })),
    []
  );

  const onSelectHandler = (value) => {
    onChange(scenarioData.find(({ name }) => name === value));
  };

  return (
    <Select
      className={styles.select}
      options={options}
      onSelect={onSelectHandler}
      value={value}
      size="large"
    />
  );
};

export default FocusScenarioSelect;
