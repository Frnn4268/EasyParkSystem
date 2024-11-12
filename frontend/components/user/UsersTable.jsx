import React from 'react';
import { Table, Tag, Button, Space, Switch } from 'antd';
import { DeleteOutlined, SyncOutlined } from '@ant-design/icons';

const UsersTable = ({ users, handleUpdate, handleDelete, handleSwitchChange, getRandomColor }) => {
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
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'Administrador' ? 'green' : 'blue'}>{role}</Tag>
      ),
    },
    {
      title: 'Estado',
      dataIndex: 'active',
      key: 'active',
      render: (active, record) => (
        <Switch
          checked={active}
          checkedChildren="Activo"
          unCheckedChildren="Inactivo"
          onChange={(checked) => handleSwitchChange(record.id, checked)}
          style={{ backgroundColor: active ? 'green' : 'red', transition: 'background-color 0.3s' }} 
        />
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
      dataSource={users} 
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

export default UsersTable;