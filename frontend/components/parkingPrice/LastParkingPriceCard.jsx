import React from 'react';
import { Card, Statistic } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import moment from 'moment';

const LastParkingPriceCard = ({ lastSavedParkingPrice, lastDateParkingPrice }) => (
  <Card bordered={false}>
    <Statistic
      title="Último precio de Estacionamiento"
      value={`Q ${lastSavedParkingPrice}/hora`} 
      precision={2}
      valueStyle={{ color: '#3f8600' }}
      prefix={<ArrowUpOutlined />}
    />
    <Statistic
      title="Fecha y Hora"
      value={lastDateParkingPrice ? moment(lastDateParkingPrice).format('YYYY-MM-DD HH:mm:ss') : '-'}
    />
  </Card>
);

export default LastParkingPriceCard;