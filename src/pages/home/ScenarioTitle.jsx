import React from 'react'
import { scenarioKeyToTitleMap } from '../../constants/scenarioKeyToTitleMap'

export const ScenarioTitle = ({ name }) => (
  <span>{scenarioKeyToTitleMap[name] ?? name}</span>
)
