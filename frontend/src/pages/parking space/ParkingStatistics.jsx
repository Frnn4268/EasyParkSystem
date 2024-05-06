import React from 'react';
import { Layout, Result } from 'antd'

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DashboardMenu.css';
import '../../css/ParkingStatistics.css'; 

const { Header } = Layout;

const ParkingStatistics = () => {
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
                    <div className='center-div-notfound-container'>
                        <Result
                            status="404"
                            title="404"
                            subTitle="Perdón, la página que intentas visitar aún no existe."
                        />
                    </div>
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

export default ParkingStatistics;