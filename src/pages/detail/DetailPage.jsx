import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Radio, Space, Typography } from "antd";

import ApplicationWrapper from "../../components/ApplicationWrapper";
import BackButton from "../../components/BackButton";
import ScenariosSankyChart from "./ScenariosSankyChart";
import scenarioTitles from "../../scenarioTitleMap.json";
import getSankyChartData from "./getSankyChartData.js";
import { routes } from "../../routes";

import styles from "./DetailPage.module.css";
import PieChart, { formatImportsPieChart } from "../../components/PieChart";
import PolarChart, {
  formatWinterSummerComparison,
} from "../../components/PolarChart";
import AreaChart, { formatMonthlyEnergyMix } from "../../components/AreaChart";
import { API_HOST } from "../../config";

const timesOfYear = [
  {
    label: "Winter",
    value: "winterValue",
  },
  {
    label: "Summer",
    value: "summerValue",
  },
  {
    label: "Year",
    value: "yearValue",
  },
];

const DetailPage = () => {
  const [timeOfYear, setTimeOfYear] = useState("yearValue");
  const [scenarioData, setScenarioData] = useState(null);
  const [stackingMode, setStackingMode] = useState("normal");
  const [chartType, setChartType] = useState("area");
  const { id } = useParams();

  const onChangeRadio = useCallback(({ target }) => {
    setTimeOfYear(target.value);
  }, []);
  const onChangeStackingMode = useCallback(({ target }) => {
    setStackingMode(target.value);
  }, []);
  const onChangeChartType = useCallback(({ target }) => {
    setChartType(target.value);
  }, []);

  useEffect(() => {
    const fetchScenario = async () => {
      try {
        // ToDo: we need to fetch from this API at some point :)
        const response = await fetch(`${API_HOST}/scenarios/${id}`);
        // const response = await fetch(`../../../data/scenario_${id}.json`, {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // })
        const scenario = await response.json();
        setScenarioData(scenario);
      } catch (error) {
        console.warn(error);
      }
    };
    fetchScenario();
  }, []);

  if (scenarioData === null) {
    return null;
  }

  return (
    <ApplicationWrapper>
      <BackButton href={routes.home} />
      <br />
      <br />
      <div className={styles.container}>
        <Space className={styles.container} direction="vertical" size="large">
          <Space direction="vertical" size="middle">
            <Typography.Title level={1}>
              {scenarioTitles[scenarioData.name]} (GWh)
            </Typography.Title>
          </Space>
          <Radio.Group size="large" value={timeOfYear} onChange={onChangeRadio}>
            {timesOfYear.map(({ value, label }) => (
              <Radio.Button key={value} value={value}>
                {label}
              </Radio.Button>
            ))}
          </Radio.Group>
          <Typography.Title level={2}>Energy use</Typography.Title>
          <ScenariosSankyChart
            scenario={getSankyChartData(scenarioData, timeOfYear)}
            timeOfYear={timeOfYear}
            id={id}
          />
          <section className={styles["small-diagrams"]}>
            <div>
              <Typography.Title level={2}>
                Composition of imports
              </Typography.Title>
              <PieChart
                scenario={formatImportsPieChart(scenarioData, timeOfYear)}
              />
            </div>
            <div>
              <Typography.Title level={2}>
                Winter-Summer Energy Mix
              </Typography.Title>
              <PolarChart
                scenario={formatWinterSummerComparison(scenarioData)}
              />
            </div>
          </section>
          <Typography.Title level={2}>
            Electricity mix over a year
          </Typography.Title>
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
          </Space>
          <AreaChart
            series={formatMonthlyEnergyMix(scenarioData)}
            stackingMode={stackingMode}
            type={chartType}
            id={id}
          />
        </Space>
      </div>
    </ApplicationWrapper>
  );
};

export default DetailPage;
