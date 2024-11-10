import React from 'react';
import { Table, Tag, Button, Space } from 'antd';
import { DeleteOutlined, SyncOutlined } from '@ant-design/icons';

const ContactTable = ({ contacts, handleUpdate, handleDelete, getRandomColor }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => (
        <Tag color={getRandomColor()}>{email}</Tag>
      ),
    },
    {
      title: 'Mensaje',
      dataIndex: 'message',
      key: 'message',
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
      dataSource={contacts} 
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

export default ContactTable;