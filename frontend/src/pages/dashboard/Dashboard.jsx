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
                                Bienvenido a Easy Park - Restaurante y Pastelería Florencia
                            </Marquee>
                        }
                    />
                    <div className="top-right-container">
                        <Row gutter={20}>
                            <Col span={40}>
                                <Card bordered={false}>
                                    <Statistic
                                    title="Porcentaje de parqueo en uso"
                                    value={100}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    suffix="%"
                                    style={{ marginBottom: 20 }}
                                    />
                                    <Statistic
                                    title="Porcentaje de parqueo en desuso"
                                    value={100}
                                    valueStyle={{
                                        color: '#cf1322',
                                    }}
                                    suffix="%"
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    <div className="bottom-right-container">
                        <Row gutter={20}>
                            <Col span={40}>
                                <Card bordered={false}>
                                    <Statistic
                                    title="Espacios de parqueo libres"
                                    value={0}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    style={{ marginBottom: 20 }}
                                    />
                                    <Statistic
                                    title="Espacios de parqueo ocupados"
                                    value={0}
                                    valueStyle={{
                                        color: '#cf1322',
                                    }}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

export default Dashboard;
