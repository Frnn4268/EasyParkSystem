import React from 'react';
import { Card, Statistic } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import moment from 'moment';

const LastIncomeCard = ({ lastSavedIncome, lastDateIncome }) => (
  <Card bordered={false}>
    <Statistic
      title="Último Ingreso"
      value={`Q ${lastSavedIncome}`} 
      precision={2}
      valueStyle={{ color: '#3f8600' }}
      prefix={<ArrowUpOutlined />}
    />
    <Statistic
      title="Fecha y Hora"
      value={lastDateIncome ? moment(lastDateIncome).format('YYYY-MM-DD HH:mm:ss') : '-'}
    />
  </Card>
);

export default LastIncomeCard;