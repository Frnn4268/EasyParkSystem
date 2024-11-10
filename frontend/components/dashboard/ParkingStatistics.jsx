import React from 'react';
import { Row, Col } from 'antd';
import ParkingStatisticsCard from './ParkingStatisticsCard';

const ParkingStatistics = ({ parkingStatistics }) => (
  <>
    <div className='top-right-container'>
      <Row gutter={20}>
        <Col span={40}>
          <div>
            <div>
              <ParkingStatisticsCard
                title="Porcentaje de parqueo disponible"
                value={parkingStatistics.unusedPercentage}
                valueStyle={{ color: "#3f8600" }}
                suffix="%"
              />
            </div>
            <div style={{ marginTop: -40 }}>
              <ParkingStatisticsCard
                title="Porcentaje de parqueo ocupado"
                value={parkingStatistics.usagePercentage}
                valueStyle={{ color: "#cf1322" }}
                suffix="%"
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <div className='bottom-right-container'>
      <Row gutter={20}>
        <Col span={40}>
          <div>
            <div>
              <ParkingStatisticsCard
                title="Espacios de parqueo libres"
                value={parkingStatistics.freeSpaces}
                valueStyle={{ color: "#3f8600" }}
              />
            </div>
            <div style={{ marginTop: -40 }}>
              <ParkingStatisticsCard
                title="Espacios de parqueo ocupados"
                value={parkingStatistics.occupiedSpaces}
                valueStyle={{ color: "#cf1322" }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </>
);

export default ParkingStatistics;
