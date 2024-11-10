import React from 'react';
import { Card } from 'antd';
import { BarChart } from '@mui/x-charts/BarChart';

const IncomeChart = ({ title, data, color }) => (
  <Card title={title} style={{ width: 700 }}>
    <BarChart
      series={[{ data: data.map(income => income.totalIncome), color }]}
      height={250}
      xAxis={[{ data: data.map(income => income._id), scaleType: 'band' }]}
    />
  </Card>
);

export default IncomeChart;