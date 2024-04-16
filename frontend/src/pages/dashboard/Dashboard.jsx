import React from 'react';
import { Layout, Alert } from 'antd';
import Marquee from 'react-fast-marquee';

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
            <Layout>
                <Layout.Sider>
                    <LeftMenu />
                </Layout.Sider>
                <Layout.Content>
                    <Alert
                            banner
                            style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}
                            message={
                                <Marquee pauseOnHover gradient={false}>
                                    Cantidad de espacios de parqueo disponibles: Cantidad de espacios de parqueo no disponibles:
                                </Marquee>
                            }
                        />
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

export default Dashboard;
