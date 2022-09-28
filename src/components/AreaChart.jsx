import React, { useCallback, useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Radio, Select, Space } from "antd";
const { Option } = Select;
import styles from "./AreaChart.module.css";

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

function calculateOrderOptions(series) {
  const options = series.map(({ name }) => [name, name]);
  return [...options].reverse();
}

function order(series, selectedOrder) {
  return [...series].sort((a, b) => {
    if (a.name == selectedOrder) {
      return 1;
    }
    if (b.name == selectedOrder) {
      return -1;
    }
    return compareLargestContributor(a, b);
  });
}

const AreaChart = ({ series }) => {
  const [stackingMode, setStackingMode] = useState("normal");
  const [chartType, setChartType] = useState("area");

  const onChangeStackingMode = useCallback(({ target }) => {
    setStackingMode(target.value);
  }, []);
  const onChangeChartType = useCallback(({ target }) => {
    setChartType(target.value);
  }, []);

  const [orderOptions, setOrderOptions] = useState(
    calculateOrderOptions(series)
  );

  useEffect(() => {
    setOrderOptions(calculateOrderOptions(series));
  }, [series]);

  const [selectedOrder, setSelectedOrder] = useState(orderOptions[0][0]);

  const [orderedSeries, setOrderedSeries] = useState(
    order(series, selectedOrder)
  );

  useEffect(() => {
    setOrderedSeries(order(series, selectedOrder));
  }, [series, selectedOrder]);

  const [chartOptions, setChartOptions] = useState(
    getChartOptions(orderedSeries, stackingMode, chartType)
  );
  useEffect(() => {
    setChartOptions(getChartOptions(orderedSeries, stackingMode, chartType));
  }, [orderedSeries, stackingMode, chartType]);

  return (
    <section className={styles.container}>
      <Space size="small">
        <Radio.Group
          size="medium"
          value={stackingMode}
          onChange={onChangeStackingMode}
        >
          <Radio.Button value="normal">Absolute</Radio.Button>
          <Radio.Button value="percent">Relative (%)</Radio.Button>
        </Radio.Group>
        <Radio.Group
          size="medium"
          value={chartType}
          onChange={onChangeChartType}
        >
          <Radio.Button value="area">Area</Radio.Button>
          <Radio.Button value="column">Bar</Radio.Button>
        </Radio.Group>
        <Select
          defaultValue={orderOptions[0][1]}
          value={selectedOrder}
          onChange={setSelectedOrder}
        >
          {orderOptions.map(([value, label]) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      </Space>
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
