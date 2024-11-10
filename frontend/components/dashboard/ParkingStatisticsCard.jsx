import React from 'react';
import { Card, Statistic } from 'antd';

const ParkingStatisticsCard = ({ title, value, valueStyle, suffix }) => (
  <Card bordered={false}>
    <Statistic
      title={title}
      value={value}
      valueStyle={valueStyle}
      suffix={suffix}
      style={{ marginBottom: 10, marginTop: 10 }}
    />
  </Card>
);

export default ParkingStatisticsCard;