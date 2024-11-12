import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';

const ParkingSpacesStatistics = ({
  parkingStatistics,
  parkingAverageTime,
  totalCustomersToday
}) => (
  <div className="center-right-container-parking">
    <Row gutter={20} style={{ marginTop: 35 }}>
      <Col span={40}>
        <Card bordered={false}>
          <Statistic
            title="Porcentaje de parqueo disponible"
            value={parkingStatistics.unusedPercentage}
            valueStyle={{
              color: '#3f8600',
            }}
            style={{ marginBottom: 20 }}
            suffix="%"
          />
          <Statistic
            title="Porcentaje de parqueo ocupado"
            value={parkingStatistics.usagePercentage}
            valueStyle={{
              color: '#cf1322',
            }}
            suffix="%"
            style={{ marginBottom: 20 }}
          />
          <Statistic
            title="Espacios de parqueo libres"
            value={parkingStatistics.freeSpaces}
            valueStyle={{
              color: '#3f8600',
            }}
            style={{ marginBottom: 20 }}
          />
          <Statistic
            title="Espacios de parqueo ocupados"
            value={parkingStatistics.occupiedSpaces}
            valueStyle={{
              color: '#cf1322',
            }}
            style={{ marginBottom: 20 }}
          />
          <Statistic
            title="Tiempo promedio de estacionado"
            value={parkingAverageTime.averageParkingTime}
            valueStyle={{
              color: '#005FFF',
            }}
            suffix="min"
            style={{ marginBottom: 20 }}
          />
          <Statistic
            title="Total de clientes registrados hoy"
            value={totalCustomersToday.totalCustomersToday}
            valueStyle={{
              color: '#C58118',
            }}
          />
        </Card>
      </Col>
    </Row>
  </div>
);

export default ParkingSpacesStatistics;