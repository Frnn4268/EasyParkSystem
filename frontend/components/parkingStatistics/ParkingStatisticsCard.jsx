import React from 'react';
import { Card } from 'antd';
import { BarChart } from '@mui/x-charts/BarChart';

const ParkingStatisticsCard = ({ title, data, color, xAxisData, style }) => (
  <Card title={title} style={{ width: 600, ...style }}>
    <BarChart
      series={[{ data, color }]}
      height={250}
      xAxis={[{ data: xAxisData, scaleType: 'band' }]}
    />
  </Card>
);

export default ParkingStatisticsCard;