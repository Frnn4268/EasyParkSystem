import React from 'react';
import { Table, Tag } from 'antd';
import moment from 'moment';

const UsualCustomersTable = ({ usualCustomers }) => {
  const currentMonthYear = moment().format('MMMM YYYY');

  const columns = [
    {
      title: 'Nombre',
      dataIndex: '_id',
      key: 'firstname_owner',
      render: (_, record) => record._id.firstname_owner
    },
    {
      title: 'Apellido',
      dataIndex: '_id',
      key: 'lastname_owner',
      render: (_, record) => record._id.lastname_owner
    },
    {
      title: 'Teléfono',
      dataIndex: ['_id', 'phone_number'],
      key: 'phone_number'
    },
    {
      title: 'Cantidad de visitas',
      dataIndex: 'count',
      key: 'count',
      render: count => (
        <Tag color={count >= 5 ? 'green' : 'default'}>
          {count}
        </Tag>
      )
    },
    {
      title: 'Mes/Año',
      key: 'month_year',
      render: () => (
        <Tag color='orange'>
          {currentMonthYear}
        </Tag>
      )
    }
  ];

  return (
    <Table 
      dataSource={usualCustomers} 
      columns={columns} 
      rowKey={(record) => record._id.phone_number} 
      pagination={{
        pageSize: 10, 
        showSizeChanger: false, 
        pageSizeOptions: ['5', '10', '20'], 
        showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} filas`,
      }}    
    />
  );
};

export default UsualCustomersTable;