import React from 'react'
import { Layout } from 'antd';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DashboardMenu.css'

const { Header, Content } = Layout;

const Park = () => {
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

export default Park;