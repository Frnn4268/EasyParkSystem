import React, { useEffect, useState } from "react";
import { Layout, Table, Typography, Tag, Space, Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DashboardMenu.css';
import '../../css/ParkingHistory.css';

const { Header } = Layout;
const { confirm } = Modal;

const ParkingHistory = () => {
    const [parkingspaces, setParkingSpaces] = useState([]);

    useEffect(() => {
        fetchParkingSpaces();
    }, []);

    const fetchParkingSpaces = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_APP_API_URL_PARKING_SPACE_ENTRY);
            if (response.ok) {
                const data = await response.json();
                setParkingSpaces(data.parkingSpaces.map(space => ({
                    ...space,
                    hour_date_entry: new Date(space.hour_date_entry).toLocaleString(),
                    hour_date_output: space.hour_date_output ? new Date(space.hour_date_output).toLocaleString() : 'N/A',
                    timed_parking_space: space.timed_parking_space ? new Date(space.timed_parking_space).toISOString().substr(11, 8) : 'N/A'
                })));
            } else {
                console.error('Error getting parking spaces');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = (id) => {
        confirm({
            title: '¿Estás seguro de eliminar este historial de parqueo?',
            content: 'Esta acción no se puede deshacer.',
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                fetch(`${import.meta.env.VITE_APP_API_URL_PARKING_SPACE_ENTRY}/${id}`, {
                    method: 'DELETE',
                })
                    .then(response => {
                        if (response.ok) {
                            fetchParkingSpaces(); 
                        } else {
                            console.error('Error to delete parking history');
                        }
                    })
                    .catch(error => {
                        console.error('Error processing request:', error);
                    });
            },
            onCancel() {
                console.log('Canceled');
            },
        });
    };

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
        <Layout>
            <Header className='home-header-dashboard'>
                <TopMenu />
            </Header>
            <Layout>
                <Layout.Sider>
                    <LeftMenu />
                </Layout.Sider>
                <Layout.Content className='layout-content-parking-history'>
                    <Typography.Title className='table-title-parking-history' level={2}>
                        Historial de Parqueo
                    </Typography.Title>
                    <Table dataSource={parkingspaces} columns={columns} rowKey="_id" />
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

export default ParkingHistory;
