import React from 'react'
import { Layout, Space } from 'antd'
import Brand from './Brand'
import styles from './ApplicationWrapper.module.css'
import { Link } from 'react-router-dom'
import { routes } from '../routes'

const { Header, Content } = Layout

const ApplicationWrapper = ({ children }) => (
  <Layout>
    <Header>
      <Space direction='horizontal'>
        <Link to={routes.home}>
          <Brand/>
        </Link>
      </Space>
    </Header>
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        {children}
      </Content>
    </Layout>
  </Layout>
)

export default ApplicationWrapper
