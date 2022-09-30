import React from 'react'
import { Layout, Space } from 'antd'
import Brand from './Brand'
import styles from './ApplicationWrapper.module.css'
import { Link } from 'react-router-dom'
import { routes } from '../routes'

const { Header, Content, Sider } = Layout

const ApplicationWrapper = ({ children, renderSider, renderContentSider }) => (
  <Layout>
    <Header>
      <Space direction='horizontal'>
        <Link to={routes.home}>
          <Brand/>
        </Link>
      </Space>
    </Header>
    <Layout className={styles.layout}>
      {renderSider && <Sider collapsible width={200} className="site-layout-background">
        {renderSider()}
      </Sider>}
      <Layout className={styles.contentContainer}>
        <Content className={styles.content}>
          {children}
        </Content>
        {renderContentSider && renderContentSider(styles)}
      </Layout>
    </Layout>
  </Layout>
)

export default ApplicationWrapper
