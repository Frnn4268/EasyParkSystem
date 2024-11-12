import React from 'react';
import { Table, Tag } from 'antd';

const VehiclesTable = ({ vehiclesHistory, typeColorMap, colorColorMap, getRandomColor }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Placa del vehículo',
      dataIndex: 'license_plate',
      key: 'license_plate',
    },
    {
      title: 'Tipo de Vehículo',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={typeColorMap[type]}>{type}</Tag>
      ),
    },
    {
      title: 'Marca del vehículo',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Color del vehículo',
      dataIndex: 'color',
      key: 'color',
      render: (color) => (
        <Tag color={colorColorMap[color]}>{color}</Tag>
      ),
    },
    {
      title: 'Nombre del cliente',
      dataIndex: 'firstname_owner',
      key: 'firstname_owner',
    },
    {
      title: 'Apellido del cliente',
      dataIndex: 'lastname_owner',
      key: 'lastname_owner',
    },
    {
      title: 'Número de teléfono del cliente',
      dataIndex: 'phone_number',
      key: 'phone_number',
      render: (phone_number, record) => (
        <Tag color={record.phone_number_color}>{phone_number}</Tag>
      ),
    },
  ];

  return (
    <Table 
      style={{ width: '94.75%', marginLeft: '75px' }}
      dataSource={vehiclesHistory} 
      columns={columns} 
      rowKey="id" 
      pagination={{
        pageSize: 12, 
        showSizeChanger: false, 
        pageSizeOptions: ['5', '10', '20'], 
        showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} filas`,
      }}
    />
  );
};

export default VehiclesTable;