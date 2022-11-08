import React from 'react'
import { useParams } from 'react-router';
import ScenariosSankyChart from "./ScenariosSankyChart";
import getSankyChartData from "./getSankyChartData.js";

export const EnergyUseSankyChart = ({ scenarioData, timeOfYear }) => {
  const { id } = useParams();
  return (
    <ScenariosSankyChart
      scenario={getSankyChartData(scenarioData, timeOfYear)}
      timeOfYear={timeOfYear}
      id={id}
    />
  )
}
