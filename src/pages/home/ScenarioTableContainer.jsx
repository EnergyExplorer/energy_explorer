import React from 'react'
import { Table, Space } from 'antd';
import { Link } from "react-router-dom";
import { Indicator } from "../../components/Indicator";
import { scenarioKeyToTitleMap } from "../../constants/scenarioKeyToTitleMap";
import { routes } from "../../routes";
import ScenarioTable from "./ScenarioTable";
import { useScenarios } from '../../hooks/useScenarios';
import { IntNumberFormat } from './IntNumberFormat';
import { Percentage } from './Percentage';
import { ScenarioTitle } from './ScenarioTitle';
import { Icon } from '../../components/Icon';

const { Column } = Table;

export const ScenarioTableContainer = ({
  selectedRowKeys,
  setSelectedRowKeys
}) => {
  const {
    scenarioSummary,
    minMaxCO2,
    minMaxCost,
    minMaxDomestic,
    minMaxTotal
  } = useScenarios()

  return (
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
            <ScenarioTitle name={value}/>
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
        title={<Space><Icon color="gray" name='co2' size='large'/><span>CO<sub>2</sub></span></Space>}
        dataIndex="co2"
        key="co2"
        align='right'
        render={value => (
          <Indicator value={value} minMax={minMaxCO2} size='small'>
            <IntNumberFormat value={value} unit="MtCO2"/>
          </Indicator>
        )}
        sorter={(a, b) => {
          return a.co2 - b.co2;
        }}
        sortDirections={["descend", "ascend", "descend"]}
      />
      <Column
        title={<Space><Icon color="green" name='money' size='large'/>Cost</Space>}
        dataIndex="cost"
        key="cost"
        align='right'
        render={value => (
          <Indicator value={value} minMax={minMaxCost} size='large'>
            <IntNumberFormat value={value} unit="M.CHF"/>
          </Indicator>
        )}
        sorter={(a, b) => {
          return a.cost - b.cost;
        }}
        sortDirections={["descend", "ascend", "descend"]}
      />
      <Column
        title={<Space>
          <Icon color="#FF0000" name='switzerland' size='large'/>Domestic Energy Production
        </Space>}
        dataIndex="domestic"
        key="domestic"
        align='right'
        render={value => (
          <Indicator
            value={value}
            minMax={minMaxDomestic}
            size='large'
            hasInvertedPercent
          >
            <Percentage value={value}/>
          </Indicator>
        )}
        sorter={(a, b) => {
          return a.domestic - b.domestic;
        }}
        sortDirections={["descend", "ascend", "descend"]}
      />
      <Column
        title={<Space><Icon color="orange" name='thunder'/>Total energy</Space>}
        dataIndex="total"
        key="total"
        align='right'
        render={value => (
          <Indicator value={value} minMax={minMaxTotal} size='large'>
            <IntNumberFormat value={value} unit="GWh"/>
          </Indicator>
        )}
        sorter={(a, b) => {
          return a.total - b.total;
        }}
        sortDirections={["descend", "ascend", "descend"]}
      />
    </ScenarioTable>
  )
}
