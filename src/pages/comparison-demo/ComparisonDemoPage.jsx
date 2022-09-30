import React, { useEffect, useState, useCallback } from "react";
import { Radio, Space, Typography } from "antd";

import ApplicationWrapper from "../../components/ApplicationWrapper";
import scenarioTitles from "../../scenarioTitleMap.json";

import styles from "./ComparisonDemoPage.module.css";
import BarChart, {
  formatImportsMultipleScenarios,
} from "../../components/BarChart";
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

async function fetchScenario(key) {
  try {
    const response = await fetch(`${API_HOST}/scenarios/${key}`);
    const scenario = await response.json();
    return scenario;
  } catch (error) {
    console.error(error);
  }
}

const ids = [
  "co2-0_no_elec_imports_2020",
  "co2-25_ elec_imports_2050",
  "co2-20_ elec_imports_2050",
  "co2-10_ elec_imports_2050",
  "co2-5_ elec_imports_2050",
  "co2-0_ elec_imports_2050",
  "co2--5_ elec_imports_2050",
];
const ComparisonDemoPage = () => {
  const [timeOfYear, setTimeOfYear] = useState("yearValue");
  const [scenarioData, setScenarioData] = useState(null);

  const onChangeRadio = useCallback(({ target }) => {
    setTimeOfYear(target.value);
  }, []);

  useEffect(() => {
    (async () => {
      const scenarioList = await Promise.all(
        ids.map(async (id) => {
          return (await fetchScenario(id)) || [];
        })
      );
      const scenarios = scenarioList.flat();
      setScenarioData(scenarios);
    })();
  }, [ids]);

  if (scenarioData === null) {
    return null;
  }

  return (
    <ApplicationWrapper>
      <Typography.Title level={1}>Scenario comparison</Typography.Title>
      <Radio.Group size="large" value={timeOfYear} onChange={onChangeRadio} className={styles['year-selector']}>
        {timesOfYear.map(({ value, label }) => (
          <Radio.Button key={value} value={value}>
            {label}
          </Radio.Button>
        ))}
      </Radio.Group>
      <section>
        <BarChart
          series={formatImportsMultipleScenarios(scenarioData, timeOfYear)}
        />
      </section>
      <section className={styles["side-by-side"]}>
        {scenarioData.map((scenario) => {
          return (
            <article key={scenario.key}>
              <Space
                className={styles.container}
                direction="vertical"
                size="large"
              >
                <Space direction="vertical" size="middle">
                  <Typography.Title level={2}>
                    {scenarioTitles[scenario.name]} (GWh)
                  </Typography.Title>
                </Space>
                <section className={styles["small-diagrams"]}>
                  <div>
                    <Typography.Title level={3}>
                      Winter-Summer Energy Mix
                    </Typography.Title>
                    <PolarChart
                      scenario={formatWinterSummerComparison(scenario)}
                    />
                  </div>
                </section>
                <Typography.Title level={3}>
                  Electricity mix over a year
                </Typography.Title>
                <AreaChart series={formatMonthlyEnergyMix(scenario)} />
              </Space>
            </article>
          );
        })}
      </section>
    </ApplicationWrapper>
  );
};

export default ComparisonDemoPage;
