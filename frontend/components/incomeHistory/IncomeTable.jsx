import React from 'react';
import { Table, Tag, Button, Space } from 'antd';
import { DeleteOutlined, SyncOutlined } from '@ant-design/icons';

const IncomeTable = ({ incomes, handleUpdate, handleDelete, getRandomColor }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Dia',
      dataIndex: 'day',
      key: 'day',
    },
    {
      title: 'Mes',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Año',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Monto monetario',
      dataIndex: 'income',
      key: 'income',
    },
    {
      title: 'Fecha y hora',
      dataIndex: 'hour_date',
      key: 'hour_date',
      render: (hour_date) => (
        <Tag color={getRandomColor()}>{hour_date}</Tag>
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
      dataSource={incomes} 
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

export default IncomeTable;