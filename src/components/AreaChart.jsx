import React, { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "./AreaChart.module.css";

function getChartOptions(
  series,
  { stackingMode, chartType, title, showLegend = true }
) {
  return {
    chart: { type: chartType },
    title: { text: title },
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
    legend: {
      enabled: showLegend,
      floating: true,
      verticalAlign: "top",
      y: 35,
    },
    tooltip: {
      valueDecimals: 1,
      valueSuffix: " GWh",
    },
    plotOptions: {
      [chartType]: {
        stacking: stackingMode,
        marker: {
          enabled: false,
          symbol: "circle",
        },
      },
    },
    series: series,
  };
}

function getNormalStackedChartOptions(series, { max, showLegend, ...options }) {
  return {
    ...getChartOptions(series, { showLegend, ...options }),
    yAxis: {
      title: { text: showLegend ? "Energy in GWh" : "" },
      tickInterval: 1000,
      labels: { enabled: showLegend },
      max,
    },
  };
}

function getPercentStackedChartOptions(series, options) {
  return {
    ...getChartOptions(series, options),
    yAxis: {
      title: { text: options.showLegend ? "Percentage of energy mix" : "" },
      tickInterval: undefined,
      max: undefined,
    },
  };
}

const sourceColors = {
  Wood: "#6BC72D",
  Waste: "#58A325",
  Wind: "#F2960E",
  Solar: "#F5DD1B",
  "Hydro RoR": "#0262AA",
  "Hydro Dams": "#0377ca",
  Imports: "#DDDDDD",
  Gas: "#808080",
  Nuclear: "#9751CB",
  Biogas: "#87D850",
  Hydrogen: "#03CBA0",
  Geothermal: "#CF4832",
};

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
    .map((series) => ({ ...series, color: sourceColors[series.name] }));
}

const AreaChart = ({
  title,
  series,
  max,
  chartType = "area",
  stackingMode = "normal",
  showLegend = true,
}) => {
  const chartOptions = useMemo(
    () =>
      stackingMode === "percent"
        ? getPercentStackedChartOptions(series, {
            title,
            stackingMode,
            chartType,
            showLegend,
          })
        : getNormalStackedChartOptions(series, {
            title,
            stackingMode,
            chartType,
            max,
            showLegend,
          }),
    [series, stackingMode, chartType, max, showLegend]
  );

  return (
    <section className={styles.container} style={{ height: "75vh" }}>
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
