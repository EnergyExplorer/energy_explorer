import React, { useCallback, useMemo, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "./AreaChart.module.css";
import MonthlyEnergyMixChartControls from "./MonthlyEnergyMixChartControls";

function getChartOptions(series, { stackingMode, chartType }) {
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
    tooltip: {
      valueDecimals: 1,
      valueSuffix: " GWh",
    },
    plotOptions: {
      [chartType]: {
        stacking: stackingMode
      },
    },
    series: series
  }
}

function getNormalStackedChartOptions (series, { max, ...options }) {
  return {
    ...getChartOptions(series, options),
    yAxis: {
      title: { text: "Energy in GWh" },
      tickInterval: 1000,
      max
    },
  }
}

function getPercentStackedChartOptions (series, options) {
  return {
    ...getChartOptions(series, options),
    yAxis: {
      title: { text: "Percentage of energy mix" },
      tickInterval: undefined,
      max: undefined
    }
  }
}

const sourceColors = {
  Wood: "#9F4F2B",
  Waste: "#99AA11",
  Wind: "#99BBCC",
  Solar: "#FFEE11",
  'Hydro RoR': "#7BDDC6",
  'Hydro Dams': "#1A428B",
  Imports: "#99AAAA",
  Gas: "#CC77DD"
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
    .map(series => ({ ...series, color: sourceColors[series.name] }))
}

const AreaChart = ({ series, scenarioData }) => {
  const [stackingMode, setStackingMode] = useState("normal");
  const onChangeStackingMode = useCallback(({ target }) => {
    setStackingMode(target.value);
  }, []);

  const [chartType, setChartType] = useState("area");
  const onChangeChartType = useCallback(({ target }) => {
    setChartType(target.value);
  }, []);

  const max = useMemo(() => {
    const maxNumber = scenarioData
      .map(scenario => formatMonthlyEnergyMix(scenario))
      .reduce((scenarioMax, energySources) => {
        const currScenarioMax = energySources[0].data.reduce(
          (aggregate, _source, columnIndex) => {
            const xAxisValues = energySources.reduce(
              (xAxisAggregate, { data }) => {
                return xAxisAggregate += data[columnIndex]
              }, 0)
            return Math.max(aggregate, xAxisValues)
          }, 0)
        return Math.max(scenarioMax, currScenarioMax)
      }, 0)
    return (Math.round(maxNumber / 1000) * 1000) + 1000
  }, [scenarioData])

  const chartOptions = useMemo(() => (
    stackingMode === 'percent'
      ? getPercentStackedChartOptions(series, { stackingMode, chartType })
      : getNormalStackedChartOptions(series, { stackingMode, chartType, max })
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
