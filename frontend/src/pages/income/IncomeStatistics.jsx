import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Card, Select, Result } from 'antd';
import { BarChart } from '@mui/x-charts/BarChart';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DashboardMenu.css';
import '../../css/IncomeStatistics.css';

const { Header } = Layout;
const { Option } = Select;

const IncomeStatistics = () => {
    const [incomeData, setIncomeData] = useState([]);
    const [period, setPeriod] = useState('week');

    useEffect(() => {
        fetchIncomeData(period);
    }, [period]);

    const fetchIncomeData = async (period) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_INCOME}/${period}`);
            const data = await response.json();
            setIncomeData(data.data);
        } catch (error) {
            console.error('Error fetching income data:', error);
        }
    };

    return (
        /*
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
                                <Card title={`Ingresos por ${period}`}>
                                    <BarChart
                                        series={[
                                            { data: incomeData.map(income => income.totalIncome) }
                                        ]}
                                        height={250}
                                        xAxis={[{ data: incomeData.map(income => income._id), scaleType: 'band' }]}
                                    />
                                </Card>
                            </Col>
                        </Row>
                        <Row justify="center" style={{ marginTop: 20 }}>
                            <Col>
                                <Select defaultValue="week" onChange={value => setPeriod(value)}>
                                    <Option value="week">Semanal</Option>
                                    <Option value="month">Mensual</Option>
                                    <Option value="year">Anual</Option>
                                </Select>
                            </Col>
                        </Row>
                    </div>
                </Layout.Content>
            </Layout>
        </Layout>
        */

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
    );
}

export default IncomeStatistics;
