import React from 'react';
import { Card, Tag } from 'antd';
import { CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';

const ParkingTimeCard = ({ data, elapsedTime, parkingCost, formatEntryTime, formatTime }) => (
  <Card title="Información de uso de Parqueo" className='card-text-customer'>
    <p>Hora de entrada:</p>
    <Tag icon={<CheckCircleOutlined />} color="success" style={{ fontWeight: 'bold', marginBottom: 25, fontSize: 13 }}>
      {formatEntryTime(data.hour_date_entry)}
    </Tag>
    <p>Tiempo estacionado: </p>
    <Tag icon={<SyncOutlined spin />} color="processing" style={{ fontWeight: 'bold', marginBottom: 25, fontSize: 13 }}>
      {formatTime(elapsedTime)}
    </Tag>
    <p>Número de espacio de parqueo: 
      <Tag color="default" style={{ fontWeight: 'bold', marginBottom: 25, fontSize: 13 }}>
        {data.parking_space_id}
      </Tag>
    </p>
    <p>Estado: 
      <Tag icon={<CloseCircleOutlined />} color="error" style={{ fontWeight: 'bold', marginBottom: 25, fontSize: 13 }}>
        {data.state}
      </Tag>
    </p> 
    <p>Costo de estacionamiento: 
      <Tag color="warning" style={{ fontWeight: 'bold', marginBottom: 25, fontSize: 13 }}>
        Q{parkingCost && parkingCost.data && parkingCost.data.parkingCost}
      </Tag>
    </p>                        
  </Card>
);

export default ParkingTimeCard;