import React from 'react';
import { Layout, Table, Tag, Typography, Button, Space, Modal, Form, Input, Drawer, Select, Row, Col } from 'antd';
import { DeleteOutlined, SyncOutlined } from '@ant-design/icons';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DashboardMenu.css'
import '../../css/Vehicle.css';

const { Header } = Layout;
const { confirm } = Modal;
const { Option } = Select;

const Vehicles = () => {
    const [vehicles, setVehicles] = React.useState([]);
    const [drawerVisible, setDrawerVisible] = React.useState(false);
    const [selectedVehicle, setSelectedVehicle] = React.useState(null);
    const [form] = Form.useForm();

    React.useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_APP_API_URL_VEHICLE);
            if (response.ok) {
                const data = await response.json();
                setVehicles(data.data);
            } else {
                console.error('Error getting vehicles');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getRandomColor = () => {
        const colors = ['blue', 'red', 'yellow', 'green', 'purple', 'orange', 'gray'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const handleDelete = (id) => {
        confirm({
            title: '¿Estás seguro de eliminar este vehículo?',
            content: 'Esta acción no se puede deshacer.',
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                fetch(`${import.meta.env.VITE_APP_API_URL_VEHICLE}/${id}`, {
                    method: 'DELETE',
                })
                    .then(response => {
                        if (response.ok) {
                            fetchVehicles(); 
                        } else {
                            console.error('Error to delete vehicle');
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

    const handleUpdate = (vehicle) => {
        setSelectedVehicle(vehicle);
        form.setFieldsValue({
            license_plate: vehicle.license_plate,
            type: vehicle.type,
            brand: vehicle.brand,
            color: vehicle.color
        });
        setDrawerVisible(true);
    };

    const onFinish = async (values) => {
        try {
            const typePlate = values.type_plate;
            
            let licensePlate = values.license_plate;
            
            licensePlate = licensePlate.replace(/^[A-Za-z]+-/, '');
            
            const mergedValue = `${typePlate}-${licensePlate}`;

            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_VEHICLE}/${selectedVehicle.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...values, license_plate: mergedValue}),
            });
            
            if (response.ok) {
                await fetchVehicles(); 
                setDrawerVisible(false);
            } else {
                console.error('Error updating vehicle');
            }
        } catch (error) {
            console.error('Error processing request:', error);
        }
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
            title: 'Placa',
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
            title: 'Marca',
            dataIndex: 'brand',
            key: 'brand',
            render: (brand) => (
                <Tag color={getRandomColor()}>{brand}</Tag>
            ),
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
            render: (color) => (
                <Tag color={colorColorMap[color]}>{color}</Tag>
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
        <Layout>
            <Header className='home-header-dashboard'>
                <TopMenu />
            </Header>
            <Layout>
                <Layout.Sider>
                    <LeftMenu />
                </Layout.Sider>
                <Layout.Content className='layout-content-vehicle'>
                    <Typography.Title className='table-title-vehicle' level={2}>
                        Vehículos
                    </Typography.Title>
                    <Table 
                        dataSource={vehicles} 
                        columns={columns} 
                        rowKey="_id" 
                        pagination={{
                            pageSize: 10, 
                            showSizeChanger: false, 
                            pageSizeOptions: ['5', '10', '20'], 
                            showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} filas`,
                        }}
                    />
                </Layout.Content>
            </Layout>
            <Drawer
                title="Editar vehículo"
                width={500}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
            >
                <Form form={form} onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Placa" name="license_plate">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item 
                                label="Tipo" 
                                name="type_plate"
                                rules={[
                                    {
                                        required: true,
                                        message: '¡Por favor selecciona el tipo de placa!',
                                    },
                                ]}
                            >
                                <Select>
                                    <Option value="P">Particulares (P)</Option>
                                    <Option value="M">Mercantiles (M)</Option>
                                    <Option value="C">Comerciales (C)</Option>
                                    <Option value="O">Oficiales (O)</Option>
                                    <Option value="CD">Cuerpo diplomático, organismos, misiones y funcionarios internacionales (CD)</Option>
                                    <Option value="De emergencia">De emergencia</Option>
                                    <Option value="De aprendizaje">De aprendizaje</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Tipo de Vehículo" name="type">
                        <Select>
                            <Option value="SUV">SUV</Option>
                            <Option value="Pickup">Pickup</Option>
                            <Option value="Hatchback">Hatchback</Option>
                            <Option value="Crossover">Crossover</Option>
                            <Option value="Convertible">Convertible</Option>
                            <Option value="Sedan">Sedan</Option>
                            <Option value="Coupe">Coupe</Option>
                            <Option value="Minivan">Minivan</Option>
                            <Option value="Otro">Otro</Option>
                        </Select>
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Marca" name="brand">
                                <Select>
                                    <Option value="Toyota">Toyota</Option>
                                    <Option value="Mitsubishi">Mitsubishi</Option>
                                    <Option value="Chevrolet">Chevrolet</Option>
                                    <Option value="Honda">Honda</Option>
                                    <Option value="Mazda">Mazda</Option>
                                    <Option value="Suzuki">Suzuki</Option>
                                    <Option value="Ford">Ford</Option>
                                    <Option value="KIA">KIA</Option>
                                    <Option value="Hyundai">Hyundai</Option>
                                    <Option value="Otro">Otro</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Color" name="color">
                                <Select>
                                    <Option value="Rojo">Rojo</Option>
                                    <Option value="Azul">Azul</Option>
                                    <Option value="Negro">Negro</Option>
                                    <Option value="Blanco">Blanco</Option>
                                    <Option value="Verde">Verde</Option>
                                    <Option value="Amarillo">Amarillo</Option>
                                    <Option value="Otro">Otro</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ textAlign: 'center' }}>Guardar cambios</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </Layout>
    )
}

export default Vehicles;
