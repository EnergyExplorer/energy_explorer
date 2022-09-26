import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export function formatMonthlyEnergyMix(scenario) {
  const sum = (a, b) => a + b;
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
    .sort((a, b) => a.data.reduce(sum) - b.data.reduce(sum));
}
const AreaChart = ({ series, stackingMode, type }) => {
  const getChartOptions = (stackingMode, chartType) => ({
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
  });
  const [chartOptions, setChartOptions] = useState(
    getChartOptions(stackingMode, type)
  );
  useEffect(() => {
    setChartOptions(getChartOptions(stackingMode, type));
  }, [series, stackingMode, type]);
  return (
    <HighchartsReact
      allowChartUpdate={true}
      immutable={false}
      highcharts={Highcharts}
      options={chartOptions}
    />
  );
};

export default AreaChart;
