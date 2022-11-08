import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Space, Typography } from "antd";

import ApplicationWrapper from "../../components/ApplicationWrapper";
import { SankyChartControls } from './SankyChartControls'

import styles from "./DetailPage.module.css";
import { EnergyUseSankyChart } from "./EnergyUseSankyChart";
import PieChart, { formatImportsPieChart } from "../../components/PieChart";
import PolarChart, {
  formatWinterSummerComparison,
} from "../../components/PolarChart";
import AreaChart, {
  formatMonthlyElectricityMix,
} from "../../components/AreaChart";
import { API_HOST } from "../../config";
import { scenarioKeyToTitleMap } from '../../constants/scenarioKeyToTitleMap'

const DetailPage = () => {
  const [timeOfYear, setTimeOfYear] = useState("yearValue");
  const [scenarioData, setScenarioData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchScenario = async () => {
      try {
        const response = await fetch(`${API_HOST}/scenarios/${id}`);
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
      <div className={styles.container}>
        <Space className={styles.container} direction="vertical" size="large">
          <Space direction="vertical" size="middle">
            <Typography.Title level={1}>
              {scenarioKeyToTitleMap[scenarioData.name]} (GWh)
            </Typography.Title>
            <SankyChartControls
              timeOfYear={timeOfYear}
              setTimeOfYear={setTimeOfYear}
              scenarioData={scenarioData}
            />
          </Space>
          <EnergyUseSankyChart
            scenarioData={scenarioData}
            timeOfYear={timeOfYear}
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
          <AreaChart
            series={formatMonthlyElectricityMix(scenarioData)}
            scenarioData={[scenarioData]}
            id={id}
          />
        </Space>
      </div>
    </ApplicationWrapper>
  );
};

export default DetailPage;
