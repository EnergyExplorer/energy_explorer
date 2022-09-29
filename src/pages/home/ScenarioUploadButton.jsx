import React from 'react';
import { Modal } from 'antd';
import ScenarioUploadForm from './ScenarioUploadForm';
import RevealButton from '../../components/RevealButton';
import { UploadOutlined } from '@ant-design/icons';

const ScenarioUploadButton = () => (
  <RevealButton
    disabled
    text={<b>Upload scenario</b>}
    icon={<b><UploadOutlined/>{'  '}</b>}
    size='large'
    renderChildren={({ isVisible, hide }) => (
      <Modal
        open={isVisible}
        title={<b>Upload scenario</b>}
        onCancel={hide}
      >
        <ScenarioUploadForm/>
      </Modal>
    )}
  />
)

export default ScenarioUploadButton
