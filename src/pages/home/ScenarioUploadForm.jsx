import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const props = {
  name: 'file',
  accept: 'text/csv,application/vnd.ms-excel',
  action: '',
  headers: {},
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
}

const { Dragger } = Upload

const ScenarioUploadForm = () => (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag and drop a CSV file here</p>
    <p className="ant-upload-hint">
      Supports CSV only. You may upload one file at a time.
    </p>
  </Dragger>
)

export default ScenarioUploadForm
