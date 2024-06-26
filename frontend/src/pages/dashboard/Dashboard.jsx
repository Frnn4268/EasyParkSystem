import { React, useState, useEffect} from 'react';
import { Layout, Alert, Row, Statistic, Col, Card } from 'antd';
import Marquee from 'react-fast-marquee';

import TopMenu from './TopMenu.jsx';
import LeftMenu from './LeftMenu.jsx';

import '../../css/DashboardMenu.css';
import logo_dashboard from '../../assets/home/logo_card.png';

const { Header } = Layout;

const Dashboard = () => {
    const [parkingStatistics, setParkingStatistics] = useState({
        usagePercentage: 0,
        unusedPercentage: 0,
        freeSpaces: 0,
        occupiedSpaces: 0
    });

    useEffect(() => {
        fetchParkingStatistics();
    }, []);

    const fetchParkingStatistics = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_PARKING_SPACE_ENTRY}/state`);
            const data = await response.json();
            const parkingSpaces = data.parkingSpaces;
    
            let occupiedCount = 0;
            let availableCount = 0;
    
            parkingSpaces.forEach(space => {
                if (space.state === 'Ocupado') {
                    occupiedCount++;
                } else if (space.state === 'Disponible') {
                    availableCount++;
                }
            });
    
            const totalSpaces = occupiedCount + availableCount;
    
            const usagePercentage = ((occupiedCount / totalSpaces) * 100).toFixed(2);
            const unusedPercentage = ((availableCount / totalSpaces) * 100).toFixed(2);
    
            setParkingStatistics({
                usagePercentage: isNaN(usagePercentage) ? 0 : usagePercentage,
                unusedPercentage: isNaN(unusedPercentage) ? 0 : unusedPercentage,
                freeSpaces: availableCount,
                occupiedSpaces: occupiedCount
            });
        } catch (error) {
            console.error('Error al obtener las estadísticas del parqueo:', error);
        }
    };

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
                                        title="Porcentaje de parqueo disponible"
                                        value={parkingStatistics.unusedPercentage}
                                        valueStyle={{
                                            color: '#3f8600',
                                        }}
                                        style={{ marginBottom: 20, marginTop: 20 }}
                                        suffix="%"
                                    />
                                    <Statistic
                                        title="Porcentaje de parqueo ocupado"
                                        value={parkingStatistics.usagePercentage}
                                        valueStyle={{
                                            color: '#cf1322',
                                        }}
                                        suffix="%"
                                        style={{ marginBottom: 20, marginTop: 20 }}
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
                                        value={parkingStatistics.freeSpaces}
                                        valueStyle={{
                                            color: '#3f8600',
                                        }}
                                        style={{ marginBottom: 20, marginTop: 20 }}
                                    />
                                    <Statistic
                                        title="Espacios de parqueo ocupados"
                                        value={parkingStatistics.occupiedSpaces}
                                        valueStyle={{
                                            color: '#cf1322',
                                        }}
                                        style={{ marginBottom: 20, marginTop: 20 }}
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
