import React, { useEffect, useMemo, useState } from "react";
import { Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomePageHeader from "./HomePageHeader";
import ApplicationWrapper from "../../components/ApplicationWrapper";
import StatCircle from "../../components/StatCircle";
import scenarioTitles from "../../scenarioTitleMap.json";
import { InfoCircleOutlined } from "@ant-design/icons";
import { routes } from "../../routes";
import { API_HOST } from "../../config";

const { Column } = Table;

function showCircle(value, percent) {
  return <StatCircle percent={percent}>{value}</StatCircle>;
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

function withUnit(unit, render, percentage) {
  const formatter = new Intl.NumberFormat();
  return (value) =>
    render(`${formatter.format(value)} ${unit}`, percentage(value));
}

async function fetchScenarios() {
  const response = await fetch(`${API_HOST}/scenarios`);
  return (await response.json()).map((scenario) => ({
    ...scenario,
    cost: Math.round(scenario.cost),
  }));
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

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = useMemo(() => ({
    columnTitle: <Tooltip title={<span>Compare max 3 scenarios</span>}>
      <InfoCircleOutlined/>
    </Tooltip>,
    selectedRowKeys,
    onChange: newSelectedRowKeys => { setSelectedRowKeys(newSelectedRowKeys) },
    getCheckboxProps: record => {
      console.log(record)
      return {
        disabled: (
          !selectedRowKeys.find(selectedRow => selectedRow === record.key)
          && selectedRowKeys.length >= 3), // Column configuration not to be checked
        name: record.name,
      }
    },
    hideSelectAll: true,
  }), [selectedRowKeys]);

  return (
    <ApplicationWrapper>
      <HomePageHeader selectedRowKeys={selectedRowKeys}/>
      <Table
        dataSource={scenarioSummary}
        pagination={false}
        rowSelection={rowSelection}>
        <Column
          title='Scenario'
          dataIndex="name"
          key="name"
          render={(value, scenario) => (
            <Link to={routes.scenario.replace(":id", scenario.key)}>
              {scenarioTitles[value] ?? value}
            </Link>
          )}
          sorter={(a, b) => {
            return (scenarioTitles[a.name] ?? a.name).localeCompare(
              scenarioTitles[b.name] ?? b.name
            );
          }}
          defaultSortOrder="ascend"
          sortDirections={["ascend", "descend", "ascend"]}
        />
        <Column
          title="CO2"
          dataIndex="co2"
          key="co2"
          render={withUnit(
            "MtCO2",
            showCircle,
            getPercentCalculator(minMaxCO2)
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
          render={withUnit(
            "M.CHF",
            showCircle,
            getPercentCalculator(minMaxCost)
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
          render={toPercentage(
            showCircle,
            getPercentCalculator(minMaxDomestic, true)
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
          render={withUnit(
            "GWh",
            showCircle,
            getPercentCalculator(minMaxTotal)
          )}
          sorter={(a, b) => {
            return a.total - b.total;
          }}
          sortDirections={["descend", "ascend", "descend"]}
        />
      </Table>
    </ApplicationWrapper>
  );
};

export default HomePage;
