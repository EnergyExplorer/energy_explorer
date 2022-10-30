import React, { useEffect, useState, useMemo } from "react";
import { Layout, Space, Typography } from "antd";
import ApplicationWrapper from "../../components/ApplicationWrapper";
import { API_HOST } from "../../config";
import { useLocation } from "react-router";
import { getSearchQuery } from "../../utils/url";
import EnergyOutlookMenu, { energyOutlookItems } from "./EnergyOutlookMenu";
import ComparisonPageContent from "./ComparisonPageContent";

const { Title } = Typography;
const { Sider } = Layout;

async function fetchScenario(key) {
  try {
    const response = await fetch(`${API_HOST}/scenarios/${key}`);
    const scenario = await response.json();
    return scenario;
  } catch (error) {
    console.error(error);
  }
}

const ComparisonPage = () => {
  const [scenarioData, setScenarioData] = useState(null);
  const { search } = useLocation();
  const ids = useMemo(() => Object.values(getSearchQuery(search)), []);

  useEffect(() => {
    setTimeout(async () => {
      const scenarioList = await Promise.all(
        ids.map(async (id) => {
          return (await fetchScenario(id)) || [];
        })
      );
      const scenarios = scenarioList.flat();
      setScenarioData(scenarios);
    }, 100);
  }, [ids]);

  const [slideKey, setSlidekey] = useState(energyOutlookItems[0].key);

  return (
    <ApplicationWrapper pageTitle="Scenario Comparison">
      <Title level={3}>Energy Outlooks</Title>
      <EnergyOutlookMenu onSelect={setSlidekey} defaultSelectedKey={slideKey} />
      {scenarioData && (
        <ComparisonPageContent
          scenarioData={scenarioData}
          slideKey={slideKey}
        />
      )}
    </ApplicationWrapper>
  );
};

export default ComparisonPage;
