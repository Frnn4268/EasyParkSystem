import React from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const ParkingHistoryTable = ({ parkingspaces, handleDelete }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id', 
      key: 'id',
    },
    {
      title: 'ID Espacio de parqueo',
      dataIndex: 'parking_space_id', 
      key: 'parking_space_id',
    },
    {
      title: 'Estado',
      dataIndex: 'state',
      key: 'state',
      render: (state) => (
        <Tag color={state === 'Ocupado' ? 'red' : 'green'}>{state}</Tag> 
      )
    },
    {
      title: 'Fecha y hora de entrada',
      dataIndex: 'hour_date_entry',
      key: 'hour_date_entry',
    },
    {
      title: 'Fecha y hora de salida',
      dataIndex: 'hour_date_output',
      key: 'hour_date_output',
    },
    {
      title: 'Tiempo de estacionamiento',
      dataIndex: 'timed_parking_space',
      key: 'timed_parking_space',
    },
    {
      title: 'Placa del vehículo',
      dataIndex: 'vehicle',
      key: 'vehicle',
      render: (vehicle) => (
        <span>{vehicle.license_plate}</span>
      ),
    },
    {
      title: 'Nombre del cliente',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer) => (
        <span>{customer.firstname_owner}</span>
      ),
    },
    {
      title: 'Apellido del cliente',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer) => (
        <span>{customer.lastname_owner}</span>
      ),
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>Eliminar</Button>
        </Space>
      ),
    },
  ];

  return (
    <Table 
      dataSource={parkingspaces} 
      columns={columns} 
      rowKey="id" 
      pagination={{
        pageSize: 9, 
        showSizeChanger: false, 
        pageSizeOptions: ['5', '10', '20'], 
        showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} filas`,
      }}
    />
  );
};

export default ParkingHistoryTable;