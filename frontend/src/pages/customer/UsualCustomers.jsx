import React, { useEffect, useState } from 'react';
import { Layout, Table, Typography, Tag } from 'antd';
import moment from 'moment';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DashboardMenu.css';
import '../../css/UsualCustomers.css'

const { Header } = Layout;

const UsualCustomers = () => {
    const [usualCustomers, setUsualCustomers] = useState([]);

    useEffect(() => {
        fetchUsualCustomers();
    }, []);

    const fetchUsualCustomers = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_PARKING_SPACE_ENTRY}/usual-customers`);
            if (response.ok) {
                const data = await response.json();
                setUsualCustomers(data.frequentCustomers);
            } else {
                console.error('Error fetching frequent customers');
            }
        } catch (error) {
            console.error(error);
        }
    } 

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
        <Layout>
            <Header className='home-header-dashboard'>
                <TopMenu />
            </Header>
            <Layout>
                <Layout.Sider>
                    <LeftMenu />
                </Layout.Sider>
                <Layout.Content className='layout-content-usual-customers'>
                    <Typography.Title className='table-title-usual-customers' level={2}>
                        Clientes Frecuentes
                    </Typography.Title>
                    <Table dataSource={usualCustomers} columns={columns} rowKey={(record) => record._id.phone_number} />
                </Layout.Content>
            </Layout>
        </Layout>
    );
}

export default UsualCustomers;
