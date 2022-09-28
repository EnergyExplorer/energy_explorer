import React from 'react';
import { Row, Col, Typography } from 'antd';
import ScenarioUploadButton from './ScenarioUploadButton';
import styles from './HomePageHeader.module.css';

const HomePageHeader = () => (
  <Row gutter={16}>
    <Col
      className="gutter-row"
      xs={{ span: 24, offset: 0 }}
      sm={{ span: 12, offset: 0 }}
    >
      <Typography.Title level={1}>Available scenarios</Typography.Title>
    </Col>
    <Col
      className="gutter-row"
      xs={{ span: 24, offset: 0 }}
      sm={{ span: 12, offset: 0 }}
    >
      <div className={styles.controls}>
        <ScenarioUploadButton/>
      </div>
    </Col>
  </Row>
)

export default HomePageHeader
