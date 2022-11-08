import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { formatImportsPieChart } from "./PieChart";
import { scenarioKeyToTitleMap } from '../constants/scenarioKeyToTitleMap'

function toPercentageValues(keyValueMap) {
  const total = Object.values(keyValueMap).reduce((a, b) => a + b);
  return Object.fromEntries(
    Object.entries(keyValueMap).map(([key, value]) => [
      key,
      (value / total) * 100,
    ])
  );
}
export function formatImportsMultipleScenarios(scenarios, timeOfYear) {
  const scenarioMap = Object.fromEntries(
    scenarios.map((scenario) => [
      scenario.name,
      toPercentageValues(
        Object.fromEntries(
          formatImportsPieChart(scenario, timeOfYear).map(({ name, y }) => [
            name,
            y,
          ])
        )
      ),
    ])
  );
  const names = new Set(
    Object.values(scenarioMap).flatMap((scenario) =>
      Object.entries(scenario)
        .filter(([, value]) => value != 0)
        .map(([key]) => key)
    )
  );
  return Object.entries(scenarioMap).map(([scenarioName, dataMap]) => {
    return {
      name: scenarioKeyToTitleMap[scenarioName] ?? scenarioName,
      label: { format: "dope" },
      data: [...names].map((name) => ({ name: name, y: dataMap[name] ?? 0 })),
    };
  });
}
const BarChart = ({ series }) => {
  const getChartOptions = () => ({
    chart: { type: "column" },
    plotOptions: {
      column: {
        // dataLabels: {
        //   format: "{series.name} {point.name}: {point.percentage:.1f} %",
        // },
      },
    },
    title: { text: "" },
    tooltip: {
      headerFormat: "{series.name}<br>",
      pointFormat: "<strong>{point.y:.1f}%</strong>",
    },
    series: series,
    xAxis: { type: "category" },
    yAxis: { min: 0, max: 100 },
  });
  const [chartOptions, setChartOptions] = useState(getChartOptions());
  useEffect(() => {
    setChartOptions(getChartOptions());
  }, [series]);
  return (
    <HighchartsReact
      allowChartUpdate={true}
      immutable={false}
      highcharts={Highcharts}
      options={chartOptions}
    />
  );
};

export default BarChart;
