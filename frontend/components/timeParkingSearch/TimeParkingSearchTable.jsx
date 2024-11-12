import React from 'react';
import { Table, Space, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const TimeParkingSearchTable = ({ timeSearchParking, handleDelete }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Fecha y hora de entrada',
      dataIndex: 'hour_date_entry',
      key: 'hour_date_entry',
    },
    {
      title: 'Fecha y hora de estacionado',
      dataIndex: 'hour_date_output',
      key: 'hour_date_output',
    },
    {
      title: 'Tiempo de búsqueda de espacio de estacionamiento',
      dataIndex: 'time_search_parking',
      key: 'time_search_parking',
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
      dataSource={timeSearchParking} 
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

export default TimeParkingSearchTable;