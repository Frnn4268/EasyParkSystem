import React, { useEffect, useState } from "react";
import { Layout, Table, Typography, Tag } from 'antd';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DashboardMenu.css';
import '../../css/VehiclesHistory.css';

const { Header } = Layout;

const VehiclesHistory = () => {
    const [vehiclesHistory, setVehiclesHistory] = useState([]);

    useEffect(() => {
        fetchVehiclesHistory();
    }, []);

    const fetchVehiclesHistory = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_APP_API_URL_PARKING_SPACE_ENTRY);
            if (response.ok) {
                const data = await response.json();

                const mappedData = data.parkingSpaces.map(space => ({
                    id: space.id,
                    firstname_owner: space.customer.firstname_owner,
                    lastname_owner: space.customer.lastname_owner,
                    phone_number: space.customer.phone_number,
                    license_plate: space.vehicle.license_plate,
                    brand: space.vehicle.brand,
                    type: space.vehicle.type,
                    color: space.vehicle.color,
                }));

                // Assign random colors to phone numbers
                mappedData.forEach(item => {
                    item.phone_number_color = getRandomColor();
                });

                setVehiclesHistory(mappedData);
            } else {
                console.error('Error getting parking spaces');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getRandomColor = () => {
        const colors = ['blue', 'red', 'yellow', 'green', 'purple', 'orange', 'gray', 'cyan', 'black', 'brown'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const typeColorMap = {
        SUV: 'blue',
        Pickup: 'red',
        Hatchback: 'yellow',
        Crossover: 'green',
        Convertible: 'purple',
        Sedan: 'orange',
        Coupe: 'gray',
        Minivan: 'cyan', 
        Otro: 'magenta'
    };

    const colorColorMap = {
        Rojo: 'volcano',
        Azul: 'geekblue',
        Negro: 'black',
        Blanco: 'lightgray',
        Verde: 'green',
        Amarillo: 'gold',
        Otro: 'cyan' 
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Placa del vehículo',
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
            title: 'Marca del vehículo',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Color del vehículo',
            dataIndex: 'color',
            key: 'color',
            render: (color) => (
                <Tag color={colorColorMap[color]}>{color}</Tag>
            ),
        },
        {
            title: 'Nombre del cliente',
            dataIndex: 'firstname_owner',
            key: 'firstname_owner',
        },
        {
            title: 'Apellido del cliente',
            dataIndex: 'lastname_owner',
            key: 'lastname_owner',
        },
        {
            title: 'Número de teléfono del cliente',
            dataIndex: 'phone_number',
            key: 'phone_number',
            render: (phone_number, record) => (
                <Tag color={record.phone_number_color}>{phone_number}</Tag>
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
                <Layout.Content className='layout-content-vehicle-history'>
                    <Typography.Title className='table-title-vehicle-history' level={2}>
                        Historial de Vehículos
                    </Typography.Title>
                    <Table 
                        dataSource={vehiclesHistory} 
                        columns={columns} 
                        rowKey="id" 
                        pagination={{
                            pageSize: 11, 
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

export default VehiclesHistory;
