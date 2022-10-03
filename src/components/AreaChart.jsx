import React, { useCallback, useMemo, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "./AreaChart.module.css";
import MonthlyEnergyMixChartControls from "./MonthlyEnergyMixChartControls";

function getChartOptions(series, stackingMode, chartType) {
  return {
    chart: { type: chartType },
    title: { text: "" },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yAxis: {
      title: {
        text:
          stackingMode == "normal"
            ? "Energy in GWh"
            : "Percentage of Energy mix",
      },
    },
    tooltip: {
      valueDecimals: 1,
      valueSuffix: " GWh",
    },
    plotOptions: {
      [chartType]: {
        stacking: stackingMode,
      },
    },
    series: series,
  };
}

function sum(a, b) {
  return a + b;
}

function compareLargestContributor(a, b) {
  return a.data.reduce(sum) - b.data.reduce(sum);
}

export function formatMonthlyEnergyMix(scenario) {
  return scenario.data.energySources
    .filter(
      (sourceName) =>
        sourceName.startsWith("Electricity") && !sourceName.endsWith("|Total")
    )
    .map((sourceName) => {
      const source = scenario.data[sourceName];
      return {
        name: sourceName.replace("Electricity|", ""),
        data: source.monthlyValues,
      };
    })
    .filter((series) => series.data.some((value) => value != 0))
    .map((serie, index) => ({ ...serie, colorIndex: index }))
    .sort(compareLargestContributor);
}

const AreaChart = ({ series }) => {
  const [stackingMode, setStackingMode] = useState("normal");
  const onChangeStackingMode = useCallback(({ target }) => {
    setStackingMode(target.value);
  }, []);

  const [chartType, setChartType] = useState("area");
  const onChangeChartType = useCallback(({ target }) => {
    setChartType(target.value);
  }, []);

  const chartOptions = useMemo(() => (
    getChartOptions(series, stackingMode, chartType)
  ), [series, stackingMode, chartType])

  return (
    <section className={styles.container}>
      <MonthlyEnergyMixChartControls
        chartType={chartType}
        stackingMode={stackingMode}
        onChangeStackingMode={onChangeStackingMode}
        onChangeChartType={onChangeChartType}
      />
      <HighchartsReact
        allowChartUpdate={true}
        immutable={false}
        highcharts={Highcharts}
        options={chartOptions}
      />
    </section>
  );
};

export default AreaChart;
