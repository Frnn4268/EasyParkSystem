import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Card } from 'antd';
import { BarChart } from '@mui/x-charts/BarChart';
import moment from 'moment';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DashboardMenu.css';
import '../../css/IncomeStatistics.css';

const { Header, Content } = Layout;

const IncomeStatistics = () => {
    const [allIncomeData, setAllIncomeData] = useState([]);

    useEffect(() => {
        fetchAllIncomeData();
    }, []);

    const fetchAllIncomeData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_INCOME}/all-incomes`);
            const data = await response.json();
            setAllIncomeData(data.data);
        } catch (error) {
            console.error('Error fetching all income data:', error);
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
                    <div style={{ marginTop: 50 }}>
                        <Row gutter={16} justify="space-around">
                            <Col span={8}>
                                <Card title="Ingresos semanales">
                                    <BarChart
                                        series={[
                                            { data: allIncomeData.map(income => income.totalIncome) }
                                        ]}
                                        height={250}
                                        xAxis={[{ data: allIncomeData.map(income => moment(income._id).format('MMM D')), scaleType: 'band' }]}
                                    />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="Estadísticas de Ingresos">
                                    <BarChart
                                        series={[
                                            { data: [35, 44, 24, 34] }, // Datos de ejemplo
                                        ]}
                                        height={250}
                                        xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Layout.Content>
            </Layout>
        </Layout>
    );
}

export default IncomeStatistics;
