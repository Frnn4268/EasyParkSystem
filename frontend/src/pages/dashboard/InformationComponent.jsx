import React from 'react';
import { Layout } from 'antd';

import TopMenu from './TopMenu.jsx';
import LeftMenu from './LeftMenu.jsx';
import CenterContent from '../../../components/dashboardInformation/CenterContent';

import '../../css/DashboardMenu.css';
import '../../css/InformationComponent.css';

const { Header } = Layout;

const InformationComponent = () => (
  <Layout>
    <Header className='home-header-dashboard'>
      <TopMenu />
    </Header>
    <Layout>
      <Layout.Sider>
        <LeftMenu />
      </Layout.Sider>
      <Layout.Content>
        <CenterContent />
      </Layout.Content>
    </Layout>
  </Layout>
);

export default InformationComponent;