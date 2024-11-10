// IncomeStatistics.jsx
import React, { useState, useEffect } from "react";
import { Layout, Row, Col } from 'antd';

import IncomeHeader from '../../../components/incomeStatistics/IncomeHeader';
import IncomeLayout from '../../../components/incomeStatistics/IncomeLayout';
import IncomeChart from '../../../components/incomeStatistics/IncomeChart';

import '../../css/DashboardMenu.css';
import '../../css/IncomeStatistics.css';

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
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/income/${period}`);
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
          const sortedYearlyIncome = data.data.sort((a, b) => parseInt(a._id.split(" ")[1]) - parseInt(b._id.split(" ")[1]));
          setYearlyIncome(sortedYearlyIncome);
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
      <IncomeHeader />
      <IncomeLayout>
        <div style={{ marginTop: 45, marginLeft: -60 }}>
          <Row gutter={16} justify="space-around">
            <Col span={8} style={{ marginBottom: 45 }}>
              <IncomeChart
                title="Ingresos Diarios"
                data={dailyIncome}
                color="#8884d8"
              />
            </Col>
            <Col span={8} style={{ marginBottom: 45 }}>
              <IncomeChart
                title="Ingresos Semanales"
                data={weeklyIncome}
                color="#82ca9d"
              />
            </Col>
          </Row>
          <Row gutter={16} justify="space-around">
            <Col span={8}>
              <IncomeChart
                title="Ingresos Mensuales"
                data={monthlyIncome}
                color="#ffc658"
              />
            </Col>
            <Col span={8}>
              <IncomeChart
                title="Ingresos Anuales"
                data={yearlyIncome}
                color="#ff7f0e"
              />
            </Col>
          </Row>
        </div>
      </IncomeLayout>
    </Layout>
  );
}

export default IncomeStatistics;