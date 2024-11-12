import React from 'react';
import { Card, Row, Col } from 'antd';

const ParkingStatisticsSummaryCard = ({ totalDailyCustomers, averageParkingTime, longestParkingTime, averageParkingSearch }) => (
  <Card style={{ width: '300px', height: '100%', marginLeft: 160 }}>
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <div style={{ textAlign: 'center', marginTop: 0 }}>
          <h3>Total de Clientes registrados hoy</h3>
          <p style={{ fontSize: '24px', color: '#82ca9d' }}>{totalDailyCustomers}</p>
        </div>
        <div style={{ textAlign: 'center', marginTop: 80 }}>
          <h3>Tiempo Promedio de Vehículos estacionados (min)</h3>
          <p style={{ fontSize: '24px', color: '#ffc658' }}>{averageParkingTime.toFixed(2)} min</p>
        </div>
        <div style={{ textAlign: 'center', marginTop: 80 }}>
          <h3>Tiempo más largo de Estacionamiento (min)</h3>
          <p style={{ fontSize: '24px', color: '#FF0000' }}>{longestParkingTime.toFixed(2)} min</p>
        </div>
        <div style={{ textAlign: 'center', marginTop: 80 }}>
          <h3>Tiempo Promedio de búsqueda de Estacionamiento (seg)</h3>
          <p style={{ fontSize: '24px', color: '#088F8F' }}>{averageParkingSearch.toFixed(2)} seg</p>
        </div>
      </Col>
    </Row>
  </Card>
);

export default ParkingStatisticsSummaryCard;