import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export function formatMonthlyEnergyMix(scenario) {
  return scenario.data.energySources
    .filter(
      (sourceName) =>
        sourceName.startsWith("Electricity") && !sourceName.endsWith("|Total")
    )
    .map((sourceName) => {
      const source = scenario.data[sourceName];
      return { name: sourceName, data: source.monthlyValues };
    })
    .filter((series) => series.data.some((value) => value != 0));
}
const AreaChart = ({ series, stackingMode }) => {
  const getChartOptions = (stackingMode) => ({
    chart: { type: "area" },
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
      title: { text: "Energy in GWh" },
    },
    tooltip: {
      valueDecimals: 1,
      valueSuffix: ' GWh'
    },
    plotOptions: {
      area: {
        stacking: stackingMode,
      },
    },
    series: series,
  });
  const [chartOptions, setChartOptions] = useState(
    getChartOptions(stackingMode)
  );
  useEffect(() => {
    console.log("updating stacking mode", stackingMode);
    setChartOptions(getChartOptions(stackingMode));
  }, [series, stackingMode]);
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
