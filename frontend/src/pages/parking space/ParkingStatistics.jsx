import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card } from 'antd';
import { BarChart } from '@mui/x-charts/BarChart';
import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DashboardMenu.css';
import '../../css/ParkingStatistics.css';

const { Header } = Layout;

const ParkingStatistics = () => {
    const [parkingStatistics, setParkingStatistics] = useState({
        usagePercentage: 0,
        unusedPercentage: 0,
        freeSpaces: 0,
        occupiedSpaces: 0
    });
    const [averageParkingTime, setParkingAverageTime] = useState(0);
    const [totalCustomersToday, setTotalCustomersToday] = useState(0);

    useEffect(() => {
        fetchParkingStatistics();
        fetchAverageParkingTime();
        fetchTotalCustomersToday();
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

    const fetchAverageParkingTime = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_PARKING_SPACE_ENTRY}/average-time`);
            const data = await response.json();
    
            const averageParkingTime = parseFloat(data.averageParkingTime);
            const formattedAverageParkingTime = averageParkingTime.toFixed(2);
    
            setParkingAverageTime(formattedAverageParkingTime);
        } catch (error) {
            console.error('Error al obtener el tiempo promedio de estacionamiento:', error);
        }
    };

    const fetchTotalCustomersToday = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_PARKING_SPACE_ENTRY}/total-customers`);
            const data = await response.json();

            setTotalCustomersToday(data.totalCustomersToday);
        } catch (error) {
            console.error('Error al obtener el total de clientes hoy:', error);
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
                <Layout.Content>
                    <div style={{ marginTop: 30, marginLeft: -60 }}>
                        <Row gutter={16} justify="space-around">
                            <Col span={8} style={{ marginBottom: 45 }}>
                                <Card title="Ocupación de Espacios" style={{ width: 700 }}>
                                    <BarChart
                                        series={[
                                            { data: [parkingStatistics.usagePercentage], label: 'Ocupado', color: '#8884d8' },
                                            { data: [parkingStatistics.unusedPercentage], label: 'Disponible', color: '#82ca9d' }
                                        ]}
                                        height={250}
                                        xAxis={[{ data: ['Estado'], scaleType: 'band' }]}
                                    />
                                </Card>
                            </Col>
                            <Col span={8} style={{ marginBottom: 45 }}>
                                <Card title="Tiempo Promedio de Estacionamiento (minutos)" style={{ width: 700 }}>
                                    <div style={{ fontSize: '2em', textAlign: 'center' }}>{averageParkingTime}</div>
                                </Card>
                            </Col>
                        </Row>
                        <Row gutter={16} justify="space-around">
                            <Col span={8}>
                                <Card title="Total de Clientes Hoy" style={{ width: 700 }}>
                                    <div style={{ fontSize: '2em', textAlign: 'center' }}>{totalCustomersToday}</div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default ParkingStatistics;
