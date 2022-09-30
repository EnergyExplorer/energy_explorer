import React, { useState } from 'react'
import { Typography, Space } from "antd";
import EnergyOutlookCarousel from "./EnergyOutlookCarousel";
import FocusScenarioSelect from "./FocusScenarioSelect";

import styles from './ComparisonPageContent.module.css'

const { Title } = Typography

const ComparisonPageContent = ({ slideKey, scenarioData }) => {
  const [focusScenario, setFocusScenario] = useState(scenarioData[0])

  return (
    <div className={styles.container}>
      <Space className={styles.titleRadio} size='large'>
        <Title className={styles.title} level={1}>Scenario comparison</Title>
        <FocusScenarioSelect
          onChange={setFocusScenario}
          scenarioData={scenarioData}
          value={focusScenario.name}
        />
      </Space>
      <EnergyOutlookCarousel
        slideIndex={slideKey}
        scenarioData={scenarioData}
        focusedScenario={focusScenario}
      />
    </div>
  )
}

export default ComparisonPageContent
