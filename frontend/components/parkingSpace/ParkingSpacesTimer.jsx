import React from 'react';
import { Popover, Button, Statistic } from 'antd';
import { ClockCircleOutlined, SyncOutlined, FileSyncOutlined } from '@ant-design/icons';

const ParkingSpacesTimer = ({
  timerValue,
  timerRunning,
  startTimer,
  resetTimer,
  formatTime
}) => (
  <Popover
    content={
      <div>
        <Statistic title="Tiempo transcurrido" value={formatTime(timerValue)} prefix={<ClockCircleOutlined />} />
        {timerRunning ? (
          <Button type="danger" icon={<SyncOutlined spin />} disabled>
            Iniciar cronómetro
          </Button>
        ) : (
          <Button type="primary" onClick={startTimer} icon={<SyncOutlined />}>
            Iniciar cronómetro
          </Button>
        )}
        <Button style={{ marginTop: '10px', marginLeft: '10px' }} type="default" onClick={resetTimer} icon={<FileSyncOutlined />}>
          Guardar tiempo
        </Button>
      </div>
    }
    title="Cronómetro de búsqueda de Estacionamiento"
    placement="bottomRight"
  >
    <Button 
      type="primary" 
      style={{ 
        position: 'fixed', 
        top: 80, 
        left: 270
      }} 
      shape="circle" 
      icon={<ClockCircleOutlined />} 
    />
  </Popover>
);

export default ParkingSpacesTimer;