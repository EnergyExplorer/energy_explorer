import React, { useCallback, useState, useMemo } from 'react';
import { Table, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { redirect } from 'react-router';
import { routes } from '../../routes';
import { createSearchQuery } from '../../utils/url';

const ScenarioTable = ({
  children,
  scenarioSummary,
  selectedRowKeys,
  setSelectedRowKeys
}) => {
  const rowSelection = useMemo(() => ({
    columnTitle: (
      <Tooltip
        placement="topRight"
        title={<span>Select max 3 scenarios to compare</span>}
      >
        <InfoCircleOutlined/>
      </Tooltip>
    ),
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    getCheckboxProps: record => ({
      disabled: (
        !selectedRowKeys.find(selectedRow => selectedRow === record.key)
        && selectedRowKeys.length >= 3), // Column configuration not to be checked
      name: record.name,
    }),
    hideSelectAll: true,
  }), [selectedRowKeys]);

  return (
  <Table
    dataSource={scenarioSummary}
    pagination={false}
    rowSelection={rowSelection}
  >
    {children}
  </Table>
)}

export default ScenarioTable
