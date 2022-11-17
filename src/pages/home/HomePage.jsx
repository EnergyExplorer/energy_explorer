import React from "react";
import ApplicationWrapper from "../../components/ApplicationWrapper";
import ScenarioUploadButton from './ScenarioUploadButton';
import ScenarioComparisonButton from './ScenarioComparisonButton';
import { PageHeader } from './PageHeader';
import { useComparisonScenarios } from "../../hooks/useComparisonScenarios";
import { ScenarioTableContainer } from './ScenarioTableContainer';
import { Space } from "antd";
import styles from './HomePage.module.css'

const HomePage = () => {
  const {
    selectedRowKeys,
    setSelectedRowKeys
  } = useComparisonScenarios()

  return (
    <ApplicationWrapper>
      <Space className={styles.homepage} size='large' direction="vertical">
        <PageHeader title='Available scenarios'>
          <ScenarioUploadButton/>
          <ScenarioComparisonButton selectedRowKeys={selectedRowKeys}/>
        </PageHeader>
        <ScenarioTableContainer
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
        />
      </Space>
    </ApplicationWrapper>
  );
};

export default HomePage;
