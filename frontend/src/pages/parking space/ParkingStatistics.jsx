import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Card } from 'antd';
import { BarChart } from '@mui/x-charts/BarChart';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DashboardMenu.css';
import '../../css/ParkingStatistics.css';

const { Header } = Layout;

const ParkingStatistics = () => {
    const [dailyCustomers, setDailyCustomers] = useState([]);
    const [dailyVehicles, setDailyVehicles] = useState([]);
    const [availableSpaces, setAvailableSpaces] = useState(0);
    const [occupiedSpaces, setOccupiedSpaces] = useState(0);
    const [usagePerSpace, setUsagePerSpace] = useState([]);
    const [totalDailyCustomers, setTotalDailyCustomers] = useState(0);
    const [averageParkingTime, setAverageParkingTime] = useState(0);
    const [longestParkingTime, setLongestParkingtime] = useState(0);
    const [averageParkingSearch, setAverageParkingSearch] = useState(0);

    useEffect(() => {
        fetchCustomerData();
        fetchVehicleData();
        fetchSpacesData();
        fetchUsagePerSpaceData();
        fetchTotalDailyCustomersData();
        fetchAverageParkingTimeData();
        fetchLongestParkingDurationOfMonth();
        fetchAverageParkingSearchData();
    }, []);

    const fetchCustomerData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_PARKING_SPACE}/total-customers-per-month`);
            const data = await response.json();
            setDailyCustomers(data);
        } catch (error) {
            console.error("Error fetching daily customer data:", error);
        }
    };

    const fetchVehicleData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_PARKING_SPACE}/total-vehicles-per-month`);
            const data = await response.json();
            setDailyVehicles(data);
        } catch (error) {
            console.error("Error fetching daily vehicle data:", error);
        }
    };

    const fetchSpacesData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_PARKING_SPACE}/total-state-spaces`);
            const data = await response.json();
            setAvailableSpaces(data.availableSpaces);
            setOccupiedSpaces(data.occupiedSpaces);
        } catch (error) {
            console.error("Error fetching parking spaces data:", error);
        }
    };

    const fetchUsagePerSpaceData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_PARKING_SPACE}/total-usage-per-space`);
            const data = await response.json();
            setUsagePerSpace(data);
        } catch (error) {
            console.error("Error fetching usage per space data:", error);
        }
    };

    const fetchTotalDailyCustomersData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_PARKING_SPACE}/total-daily-customers`);
            const data = await response.json();
            setTotalDailyCustomers(data.totalCustomers);
        } catch (error) {
            console.error("Error fetching total daily customers data:", error);
        }
    };

    const fetchAverageParkingTimeData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_PARKING_SPACE}/average-parking-time`);
            const data = await response.json();
            setAverageParkingTime(data.averageParkingTime);
        } catch (error) {
            console.error("Error fetching average parking time data:", error);
        }
    };

    const fetchLongestParkingDurationOfMonth = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_PARKING_SPACE}/longest-parking-duration-of-month`);
            const data = await response.json();
            setLongestParkingtime(data.longestParkingDuration);
        } catch (error) {
            console.error("Error fetching longest parking duration: ", error);
        }
    };

    const fetchAverageParkingSearchData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_PARKING_SPACE}/average-time-search-parking`);
            const data = await response.json();
            setAverageParkingSearch(data.averageTimeInSeconds); // Utiliza el valor correcto del objeto de respuesta
        } catch (error) {
            console.error("Error fetching average parking search time data:", error);
        }
    };


    const formatDataForChart = (data, label) => {
        const labels = data.map(item => item._id);
        const counts = data.map(item => item[label]);
        return { labels, counts };
    };

    const customerChartData = formatDataForChart(dailyCustomers, 'totalCustomers');
    const vehicleChartData = formatDataForChart(dailyVehicles, 'totalVehicles');
    const usagePerSpaceChartData = formatDataForChart(usagePerSpace, 'usageCount');

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
                    <div style={{ marginTop: 40, marginLeft: 90 }}>
                        <Row gutter={16} justify="space-around">
                            <Col span={16}>
                                <Row gutter={[16, 16]} justify="space-around">
                                    <Col span={12} style={{ marginBottom: 45 }}>
                                        <Card title="Clientes por Día del Mes" style={{ width: 600 }}>
                                            <BarChart
                                                series={[{ data: customerChartData.counts, color: '#ffa500' }]}
                                                height={250}
                                                xAxis={[{ data: customerChartData.labels, scaleType: 'band' }]}
                                            />
                                        </Card>
                                    </Col>
                                    <Col span={12} style={{ marginBottom: 0 }}>
                                        <Card title="Vehículos por Día del Mes" style={{ width: 600, marginLeft: 100 }}>
                                            <BarChart
                                                series={[{ data: vehicleChartData.counts, color: '#82ca9d' }]}
                                                height={250}
                                                xAxis={[{ data: vehicleChartData.labels, scaleType: 'band' }]}
                                            />
                                        </Card>
                                    </Col>
                                    <Col span={12} style={{ marginBottom: 0 }}>
                                        <Card title="Espacios Disponibles y Ocupados" style={{ width: 600 }}>
                                            <BarChart
                                                series={[
                                                    { name: 'Disponibles', data: [availableSpaces], color: '#009846' },
                                                    { name: 'Ocupados', data: [occupiedSpaces], color: '#ff7f0e' }
                                                ]}
                                                height={250}
                                                xAxis={[{ data: ['Espacios'], scaleType: 'band' }]}
                                            />
                                        </Card>
                                    </Col>
                                    <Col span={12} style={{ marginBottom: 0 }}>
                                        <Card title="Cantidad total de uso por espacio de parqueo" style={{ width: 600, marginLeft: 100 }}>
                                            <BarChart
                                                series={[{ data: usagePerSpaceChartData.counts, color: '#8884d8' }]}
                                                height={250}
                                                xAxis={[{ data: usagePerSpaceChartData.labels, scaleType: 'band' }]}
                                            />
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Card style={{ width: '300px', height: '100%', marginLeft: 160 }}>
                                    <Row gutter={[16, 16]}>
                                        <Col span={24}>
                                            <div style={{ textAlign: 'center', marginTop: 0 }}>
                                                <h3>Total de Clientes Diarios</h3>
                                                <p style={{ fontSize: '24px', color: '#82ca9d' }}>{totalDailyCustomers}</p>
                                            </div>
                                            <div style={{ textAlign: 'center', marginTop: 80 }}>
                                                <h3>Tiempo Promedio de Parqueo (min)</h3>
                                                <p style={{ fontSize: '24px', color: '#ffc658' }}>{averageParkingTime.toFixed(2)} min</p>
                                            </div>
                                            <div style={{ textAlign: 'center', marginTop: 80 }}>
                                                <h3>Tiempo más largo de estacionamiento (min)</h3>
                                                <p style={{ fontSize: '24px', color: '#FF0000' }}>{longestParkingTime.toFixed(2)} min</p>
                                            </div>
                                            <div style={{ textAlign: 'center', marginTop: 80 }}>
                                                <h3>Tiempo Promedio de búsqueda de Estacionamiento (seg)</h3>
                                                <p style={{ fontSize: '24px', color: '#088F8F' }}>{averageParkingSearch.toFixed(2)} seg</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Layout.Content>
            </Layout>
        </Layout>
    );
}

export default ParkingStatistics;
