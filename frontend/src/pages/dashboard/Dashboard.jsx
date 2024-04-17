import React from 'react';
import { Layout, Alert, Row, Statistic, Col, Card } from 'antd';
import Marquee from 'react-fast-marquee';

import TopMenu from './TopMenu.jsx';
import LeftMenu from './LeftMenu.jsx';

import '../../css/DashboardMenu.css';
import logo_dashboard from '../../assets/home/logo_card.png';

const { Header } = Layout;

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
                <Layout.Content className='layout-content-dashboard'>
                    <img src={logo_dashboard} className='logo-dashboard' />
                    <Alert
                        banner
                        className='alert-layout'
                        message={
                            <Marquee pauseOnHover gradient={false}>
                                Cantidad de espacios de parqueo disponibles: Cantidad de espacios de parqueo no disponibles:
                            </Marquee>
                        }
                    />
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card bordered={false}>
                                <Statistic
                                title="Active"
                                value={11.28}
                                precision={2}
                                valueStyle={{
                                    color: '#3f8600',
                                }}
                                suffix="%"
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={false}>
                                <Statistic
                                title="Idle"
                                value={9.3}
                                precision={2}
                                valueStyle={{
                                    color: '#cf1322',
                                }}
                                suffix="%"
                                />
                            </Card>
                        </Col>
                    </Row>
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

export default Dashboard;
