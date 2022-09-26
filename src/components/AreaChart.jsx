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
const AreaChart = ({ series }) => {
  const getChartOptions = () => ({
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
    plotOptions: {
      area: {
        stacking: "normal",
      },
    },
    series: series,
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

export default AreaChart;
