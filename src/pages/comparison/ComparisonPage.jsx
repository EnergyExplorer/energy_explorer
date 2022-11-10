import React, { useEffect, useState, useMemo } from "react";
import { Layout, Typography } from "antd";
import ApplicationWrapper from "../../components/ApplicationWrapper";
import { API_HOST } from "../../config";
import { useLocation } from "react-router";
import { getSearchQuery } from "../../utils/url";
import EnergyOutlookMenu, { energyOutlookItems } from "./EnergyOutlookMenu";
import ComparisonPageContent from "./ComparisonPageContent";
import { PageHeader } from '../home/PageHeader';
import { ComparisonChoiceDrawer } from './ComparisonChoiceDrawer';

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
      <PageHeader title='Energy Outlook'>
        <ComparisonChoiceDrawer/>
      </PageHeader>
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
