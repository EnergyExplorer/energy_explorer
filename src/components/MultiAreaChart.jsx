import React, { useCallback, useMemo, useState } from "react";

import AreaChart, { formatMonthlyElectricityMix } from "@/components/AreaChart";
import AreaChartControls from "@/components/AreaChartControls";
import scenarioNames from "@/scenarioTitleMap.json";

import styles from "./MultiAreaChart.module.css";

function MultiAreaChart({ scenarios }) {
  const max = useMemo(() => {
    const maxNumber = scenarios
      .map((scenario) => formatMonthlyElectricityMix(scenario))
      .reduce((scenarioMax, energySources) => {
        const currScenarioMax = energySources[0].data.reduce(
          (aggregate, _source, columnIndex) => {
            const xAxisValues = energySources.reduce(
              (xAxisAggregate, { data }) => {
                return (xAxisAggregate += data[columnIndex]);
              },
              0
            );
            return Math.max(aggregate, xAxisValues);
          },
          0
        );
        return Math.max(scenarioMax, currScenarioMax);
      }, 0);
    return Math.round(maxNumber / 1000) * 1000 + 1000;
  }, [scenarios]);
  const [stackingMode, setStackingMode] = useState("normal");
  const onChangeStackingMode = useCallback(({ target }) => {
    setStackingMode(target.value);
  }, []);

  const [chartType, setChartType] = useState("area");
  const onChangeChartType = useCallback(({ target }) => {
    setChartType(target.value);
  }, []);

  return (
    <>
      <AreaChartControls
        chartType={chartType}
        stackingMode={stackingMode}
        onChangeStackingMode={onChangeStackingMode}
        onChangeChartType={onChangeChartType}
      />
      <div className={styles["chart-section"]}>
        {scenarios.map((scenario, index) => (
          <AreaChart
            key={scenario.name}
            title={scenarioNames[scenario.name] ?? scenario.name}
            max={max}
            series={formatMonthlyElectricityMix(scenario)}
            chartType={chartType}
            stackingMode={stackingMode}
            showLegend={index == 0}
          />
        ))}
      </div>
    </>
  );
}

export default MultiAreaChart;
