import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Card } from 'antd';
import { BarChart } from '@mui/x-charts/BarChart';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DashboardMenu.css';
import '../../css/IncomeStatistics.css';

const { Header } = Layout;

const IncomeStatistics = () => {
    const [weeklyIncomes, setWeeklyIncomes] = useState([]);

    useEffect(() => {
        fetchWeekIncomeData();
    }, []);

    const fetchWeekIncomeData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_INCOME}/week-income`);
            const data = await response.json();
            setWeeklyIncomes(data.data);
        } catch (error) {
            console.error('Error fetching week income data:', error);
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
                                            { data: weeklyIncomes.map(income => income.totalIncome) }
                                        ]}
                                        height={250}
                                        xAxis={[{ data: weeklyIncomes.map(income => income.day), scaleType: 'band' }]}
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
