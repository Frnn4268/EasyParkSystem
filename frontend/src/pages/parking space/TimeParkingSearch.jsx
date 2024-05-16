import React, { useEffect, useState } from "react";
import { Layout, Table, Typography, Tag, Space, Button, Modal, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DashboardMenu.css';
import '../../css/ParkingHistory.css';

const { Header } = Layout;
const { confirm } = Modal;

const TimeParkingSearch = () => {
    const [timeSearchParking, setTimeSearchParking] = useState([]);

    useEffect(() => {
        fetchTimeSearchParking();
    }, []);

    const fetchTimeSearchParking = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_APP_API_URL_PARKING_TIME_SEARCH);
            if (response.ok) {
                const data = await response.json();
                setTimeSearchParking(data.data.map(space => ({
                    ...space,
                    hour_date_entry: new Date(space.hour_date_entry).toLocaleString(),
                    hour_date_output: space.hour_date_output ? new Date(space.hour_date_output).toLocaleString() : 'N/A',
                    time_search_parking: space.time_search_parking ? new Date(space.time_search_parking).toISOString().substr(11, 8) : 'N/A'
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
            title: '¿Estás seguro de eliminar este tiempo de búsqueda de estacionamiento?',
            content: 'Esta acción no se puede deshacer.',
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            async onOk() {
                try {
                    const response = await fetch(`${import.meta.env.VITE_APP_API_URL_PARKING_TIME_SEARCH}/${id}`, {
                        method: 'DELETE',
                    });
                    if (response.ok) {
                        await fetchTimeSearchParking();
                        message.success('Tiempo de búsqueda de parqueo eliminado exitosamente.');
                    } else if (response.status === 400) {
                        const data = await response.json();
                        message.warning(data.message);
                    } else {
                        console.error('Error to delete parking history');
                    }
                } catch (error) {
                    console.error('Error processing request:', error);
                }
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
                        Historial de Tiempos de Búsqueda de Estacionamiento
                    </Typography.Title>
                    <Table 
                        dataSource={timeSearchParking} 
                        columns={columns} rowKey="_id" 
                        pagination={{
                            pageSize: 10, 
                            showSizeChanger: false, 
                            pageSizeOptions: ['5', '10', '20'], 
                            showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} filas`,
                        }}
                    />
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

export default TimeParkingSearch;
