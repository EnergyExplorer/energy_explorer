import React from 'react';
import { Row, Col, Typography, Space } from 'antd';
import styles from './PageHeader.module.css';

export const PageHeader = ({ title, children }) => (
  <Row gutter={16}>
    <Col
      className="gutter-row"
      xs={{ span: 24, offset: 0 }}
      sm={{ span: 12, offset: 0 }}
    >
      <Typography.Title level={1}>{title}</Typography.Title>
    </Col>
    <Col
      className="gutter-row"
      xs={{ span: 24, offset: 0 }}
      sm={{ span: 12, offset: 0 }}
    >
      <div className={styles.controls}>
        <Space direction='horizontal'>
          {children}
        </Space>
      </div>
    </Col>
  </Row>
)
