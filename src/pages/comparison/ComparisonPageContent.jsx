import React, { useState } from 'react'
import { Space } from "antd";
import EnergyOutlookCarousel from "./EnergyOutlookCarousel";
import FocusScenarioSelect from "./FocusScenarioSelect";

import styles from './ComparisonPageContent.module.css'

const ComparisonPageContent = ({ slideKey, scenarioData }) => {
  const [focusScenario, setFocusScenario] = useState(scenarioData[0])

  return (
    <div className={styles.container}>
      <FocusScenarioSelect
        onChange={setFocusScenario}
        scenarioData={scenarioData}
        value={focusScenario.name}
      />
      <EnergyOutlookCarousel
        slideIndex={slideKey}
        scenarioData={scenarioData}
        focusedScenario={focusScenario}
      />
    </div>
  )
}

export default ComparisonPageContent
