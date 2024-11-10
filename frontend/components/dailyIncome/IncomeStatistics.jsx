import React from 'react';
import { Row, Col } from 'antd';
import LastIncomeCard from './LastIncomeCard';

const IncomeStatistics = ({ lastSavedIncome, lastDateIncome }) => (
  <Row gutter={10} style={{ marginLeft: '4.5%', width: '100%' }}>
    <Col span={6}>
      <LastIncomeCard 
        lastSavedIncome={lastSavedIncome} 
        lastDateIncome={lastDateIncome} 
      />
    </Col>
  </Row>
);

export default IncomeStatistics;