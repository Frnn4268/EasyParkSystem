import React from 'react';
import { Table, Tag, Button, Space } from 'antd';
import { DeleteOutlined, SyncOutlined } from '@ant-design/icons';

const VehiclesTable = ({ vehicles, handleUpdate, handleDelete, getRandomColor, typeColorMap, colorColorMap }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Placa',
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
      title: 'Marca',
      dataIndex: 'brand',
      key: 'brand',
      render: (brand) => (
        <Tag color={getRandomColor()}>{brand}</Tag>
      ),
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      render: (color) => (
        <Tag color={colorColorMap[color]}>{color}</Tag>
      ),
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" icon={<SyncOutlined />} onClick={() => handleUpdate(record)}>Editar</Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>Eliminar</Button>
        </Space>
      ),
    },
  ];

  return (
    <Table 
      dataSource={vehicles} 
      columns={columns} 
      rowKey="id" 
      pagination={{
        pageSize: 10, 
        showSizeChanger: false, 
        pageSizeOptions: ['5', '10', '20'], 
        showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} filas`,
      }}
    />
  );
};

export default VehiclesTable;