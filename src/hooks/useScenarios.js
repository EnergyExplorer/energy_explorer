import { useEffect, useState } from 'react';
import { API_HOST } from '../../src/config';

export const useScenarios = () => {
  const [scenarioSummary, setScenarioSummary] = useState([]);
  const [minMaxCO2, setMinMaxCO2] = useState({ min: 0, max: 0 });
  const [minMaxCost, setMinMaxCost] = useState({ min: 0, max: 0 });
  const [minMaxDomestic, setMinMaxDomestic] = useState({ min: 0, max: 0 });
  const [minMaxTotal, setMinMaxTotal] = useState({ min: 0, max: 0 });

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const response = await fetch(`${API_HOST}/scenarios`)
        const scenarios = await response.json()
        setScenarioSummary(
          scenarios.map((scenario) => ({
            ...scenario,
            cost: Math.round(scenario.cost)
          }))
        )
      } catch (error) {
        console.error("Could not load scenarios", error)
      }
    }
    fetchScenarios()
  }, []);

  useEffect(() => {
    const co2 = scenarioSummary.map((scenario) => scenario.co2);
    const cost = scenarioSummary.map((scenario) => scenario.cost);
    const domestic = scenarioSummary.map((scenario) => scenario.domestic);
    const total = scenarioSummary.map((scenario) => scenario.total);
    setMinMaxCO2({
      max: Math.max(...co2),
      min: Math.min(...co2),
    });
    setMinMaxCost({
      max: Math.max(...cost),
      min: Math.min(...cost),
    });
    setMinMaxDomestic({
      max: 1,
      min: Math.min(...domestic),
    });
    setMinMaxTotal({
      max: Math.max(...total),
      min: Math.min(...total),
    });
  }, [scenarioSummary]);

  return {
    scenarioSummary,
    minMaxCO2,
    minMaxCost,
    minMaxDomestic,
    minMaxTotal
  }
}
