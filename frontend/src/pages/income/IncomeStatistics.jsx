import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Card } from 'antd';
import { BarChart } from '@mui/x-charts/BarChart';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

const { Header } = Layout;

const IncomeStatistics = () => {
    const [dailyIncome, setDailyIncome] = useState([]);
    const [weeklyIncome, setWeeklyIncome] = useState([]);
    const [monthlyIncome, setMonthlyIncome] = useState([]);
    const [yearlyIncome, setYearlyIncome] = useState([]);

    useEffect(() => {
        fetchIncomeData('day');
        fetchIncomeData('week');
        fetchIncomeData('month');
        fetchIncomeData('year');
    }, []);

    const fetchIncomeData = async (period) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_INCOME}/${period}`);
            const data = await response.json();
            switch (period) {
                case 'day':
                    setDailyIncome(data.data);
                    break;
                case 'week':
                    setWeeklyIncome(data.data);
                    break;
                case 'month':
                    setMonthlyIncome(data.data);
                    break;
                case 'year':
                    setYearlyIncome(data.data);
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error(`Error fetching ${period} income data:`, error);
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
                                <Card title="Ingresos Diarios" style={{ width: 700 }}>
                                    <BarChart
                                        series={[{ data: dailyIncome.map(income => income.totalIncome), color: '#8884d8' }]}
                                        height={250}
                                        xAxis={[{ data: dailyIncome.map(income => income._id), scaleType: 'band' }]}
                                    />
                                </Card>
                            </Col>
                            <Col span={8} style={{ marginBottom: 45 }}>
                                <Card title="Ingresos Semanales" style={{ width: 700 }}>
                                    <BarChart
                                        series={[{ data: weeklyIncome.map(income => income.totalIncome), color: '#82ca9d' }]}
                                        height={250}
                                        xAxis={[{ data: weeklyIncome.map(income => income._id), scaleType: 'band' }]}
                                    />
                                </Card>
                            </Col>
                        </Row>
                        <Row gutter={16} justify="space-around">
                            <Col span={8}>
                                <Card title="Ingresos Mensuales" style={{ width: 700 }}>
                                    <BarChart
                                        series={[{ data: monthlyIncome.map(income => income.totalIncome), color: '#ffc658' }]}
                                        height={250}
                                        xAxis={[{ data: monthlyIncome.map(income => income._id), scaleType: 'band' }]}
                                    />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="Ingresos Anuales" style={{ width: 700 }}>
                                    <BarChart
                                        series={[{ data: yearlyIncome.map(income => income.totalIncome), color: '#ff7f0e' }]}
                                        height={250}
                                        xAxis={[{ data: yearlyIncome.map(income => income._id), scaleType: 'band' }]}
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
