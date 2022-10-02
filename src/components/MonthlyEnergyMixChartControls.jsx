import React from 'react'
import { Radio, Select, Space } from "antd";

const { Option } = Select;

const MonthlyEnergyMixChartControls = ({
  chartType,
  stackingMode,
  orderOptions,
  selectedOrder,
  onChangeStackingMode,
  onChangeChartType,
  setSelectedOrder
}) => {
  return (
    <Space size="small">
      <Radio.Group
        size="medium"
        value={stackingMode}
        onChange={onChangeStackingMode}
      >
        <Radio.Button value="normal">Absolute</Radio.Button>
        <Radio.Button value="percent">Relative (%)</Radio.Button>
      </Radio.Group>
      <Radio.Group
        size="medium"
        value={chartType}
        onChange={onChangeChartType}
      >
        <Radio.Button value="area">Area</Radio.Button>
        <Radio.Button value="column">Bar</Radio.Button>
      </Radio.Group>
      <Select
        defaultValue={orderOptions[0][1]}
        value={selectedOrder}
        onChange={setSelectedOrder}
      >
        {orderOptions.map(([value, label]) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    </Space>
  )
}

export default MonthlyEnergyMixChartControls
