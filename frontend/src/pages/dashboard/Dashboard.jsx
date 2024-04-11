import React from 'react';
import { Layout } from 'antd';

import TopMenu from './TopMenu.jsx';
import LeftMenu from './LeftMenu.jsx';

import '../../css/DashboardMenu.css'

const { Header, Content } = Layout;

const Dashboard = () => {
    return (
        <Layout>
            <Header className='home-header-dashboard'>
                <TopMenu />
            </Header>
            <Content>
                <LeftMenu />
            </Content>
        </Layout>
    )
}

export default Dashboard;
