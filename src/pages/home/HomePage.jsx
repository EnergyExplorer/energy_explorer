import React, { useEffect, useState } from "react";
import { Table } from 'antd';
import { Link, useLocation } from "react-router-dom";
import HomePageHeader from "./HomePageHeader";
import ApplicationWrapper from "../../components/ApplicationWrapper";
import { Indicator } from "../../components/Indicator";
import { scenarioKeyToTitleMap } from "../../constants/scenarioKeyToTitleMap";
import { routes } from "../../routes";
import { API_HOST } from "../../config";
import ScenarioTable from "./ScenarioTable";
import { getSearchQuery } from "../../utils/url";

const { Column } = Table;

function indicate(value, percent, size) {
  return <Indicator size={size} percent={percent}>{value}</Indicator>;
}

function getPercentCalculator(minMax, inverted = false) {
  return function (value) {
    const percentage = ((value - minMax.min) / (minMax.max - minMax.min)) * 100;
    if (inverted) {
      return percentage;
    }
    return 100 - percentage;
  };
}

function toPercentage(render, percentage) {
  return (value) => render((value * 100).toFixed(0) + "%", percentage(value));
}

function withUnit(unit, render, percentage, size) {
  const formatter = new Intl.NumberFormat();
  return (value) =>
}

async function fetchScenarios() {
  const response = await fetch(`${API_HOST}/scenarios`);
  return (await response.json()).map((scenario) => ({
    ...scenario,
    cost: Math.round(scenario.cost),
  }));
    render(`${formatter.format(value)} ${unit}`, percentage(value), size);
}

const HomePage = () => {
  const [scenarioSummary, setScenarioSummary] = useState([]);
  const [minMaxCO2, setMinMaxCO2] = useState({ min: 0, max: 0 });
  const [minMaxCost, setMinMaxCost] = useState({ min: 0, max: 0 });
  const [minMaxDomestic, setMinMaxDomestic] = useState({ min: 0, max: 0 });
  const [minMaxTotal, setMinMaxTotal] = useState({ min: 0, max: 0 });

  useEffect(() => {
    (async function () {
      setScenarioSummary(await fetchScenarios());
    })().catch((error) => console.error("Could not load scenarios", error));
  }, []);

  useEffect(() => {
    const co2 = scenarioSummary.map((scenario) => scenario.co2);
    const cost = scenarioSummary.map((scenario) => scenario.cost);
    const domestic = scenarioSummary.map((scenario) => scenario.domestic);
    const total = scenarioSummary.map((scenario) => scenario.total);
    setMinMaxCO2({
      max: Math.max(...co2),
      min: Math.min(...co2),
    });
    setMinMaxCost({
      max: Math.max(...cost),
      min: Math.min(...cost),
    });
    setMinMaxDomestic({
      max: 1,
      min: Math.min(...domestic),
    });
    setMinMaxTotal({
      max: Math.max(...total),
      min: Math.min(...total),
    });
  }, [scenarioSummary]);

  const { search } = useLocation()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  useEffect(() => {
    const { scenario_0, scenario_1, scenario_2 } = getSearchQuery(search)
    setSelectedRowKeys([scenario_0, scenario_1, scenario_2].filter(sce => sce))
  }, [])

  return (
    <ApplicationWrapper pageTitle='Available scenarios'>
      <HomePageHeader selectedRowKeys={selectedRowKeys}/>
      <ScenarioTable
        scenarioSummary={scenarioSummary}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      >
        <Column
          title='Scenario'
          dataIndex="name"
          key="name"
          render={(value, scenario) => (
            <Link to={routes.scenario.replace(":id", scenario.key)}>
              {scenarioKeyToTitleMap[value] ?? value}
            </Link>
          )}
          sorter={(a, b) => {
            return (scenarioKeyToTitleMap[a.name] ?? a.name).localeCompare(
              scenarioKeyToTitleMap[b.name] ?? b.name
            );
          }}
          defaultSortOrder="ascend"
          sortDirections={["ascend", "descend", "ascend"]}
        />
        <Column
          title="CO2"
          dataIndex="co2"
          key="co2"
          align='right'
          render={withUnit(
            "MtCO2",
            indicate,
            getPercentCalculator(minMaxCO2),
            'small'
          )}
          sorter={(a, b) => {
            return a.co2 - b.co2;
          }}
          sortDirections={["descend", "ascend", "descend"]}
        />
        <Column
          title="Cost"
          dataIndex="cost"
          key="cost"
          align='right'
          render={withUnit(
            "M.CHF",
            indicate,
            getPercentCalculator(minMaxCost),
            'large'
          )}
          sorter={(a, b) => {
            return a.cost - b.cost;
          }}
          sortDirections={["descend", "ascend", "descend"]}
        />
        <Column
          title="Domestic Energy Production"
          dataIndex="domestic"
          key="domestic"
          align='right'
          render={toPercentage(
            indicate,
            getPercentCalculator(minMaxDomestic, true),
            'small'
          )}
          sorter={(a, b) => {
            return a.domestic - b.domestic;
          }}
          sortDirections={["descend", "ascend", "descend"]}
        />
        <Column
          title="Total energy"
          dataIndex="total"
          key="total"
          align='right'
          render={withUnit(
            "GWh",
            indicate,
            getPercentCalculator(minMaxTotal),
            'large'
          )}
          sorter={(a, b) => {
            return a.total - b.total;
          }}
          sortDirections={["descend", "ascend", "descend"]}
        />
      </ScenarioTable>
    </ApplicationWrapper>
  );
};

export default HomePage;
