import React from 'react';
import { Table, Tag, Button, Space } from 'antd';
import { DeleteOutlined, SyncOutlined } from '@ant-design/icons';

const CustomerTable = ({ customers, handleUpdate, handleDelete, getRandomColor }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre',
      dataIndex: 'firstname_owner',
      key: 'firstname_owner',
    },
    {
      title: 'Apellido',
      dataIndex: 'lastname_owner',
      key: 'lastname_owner',
    },
    {
      title: 'Número de teléfono',
      dataIndex: 'phone_number',
      key: 'phone_number',
      render: (phone_number) => (
        <Tag color={getRandomColor()}>{phone_number}</Tag>
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
      dataSource={customers} 
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

export default CustomerTable;