import React from "react";
import ApplicationWrapper from "../../components/ApplicationWrapper";
import ScenarioUploadButton from './ScenarioUploadButton';
import ScenarioComparisonButton from './ScenarioComparisonButton';
import { PageHeader } from './PageHeader';
import { useComparisonScenarios } from "../../hooks/useComparisonScenarios";
import { ScenarioTableContainer } from './ScenarioTableContainer';

const HomePage = () => {
  const {
    selectedRowKeys,
    setSelectedRowKeys
  } = useComparisonScenarios()

  return (
    <ApplicationWrapper pageTitle='Available scenarios'>
      <PageHeader title='Available scenarios'>
        <ScenarioUploadButton/>
        <ScenarioComparisonButton selectedRowKeys={selectedRowKeys}/>
      </PageHeader>
      <ScenarioTableContainer
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
    </ApplicationWrapper>
  );
};

export default HomePage;
