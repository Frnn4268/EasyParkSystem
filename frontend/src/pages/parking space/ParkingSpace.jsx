import React, { useState } from 'react';
import { Layout, Button, ConfigProvider, Drawer, Space, Col, Form, Input, Row, Select, Card, Statistic, Typography, Divider } from 'antd';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DashboardMenu.css';
import '../../css/ParkingSpaces.css';

const { Header } = Layout;
const { Option } = Select;

const buttonWidth = 60;
const buttonHeight = 120;

const ParkingSpaces = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);
    const [buttonNumber, setButtonNumber] = useState(null);
    const [form] = Form.useForm();

    const showDrawer = (content, number) => {
        setDrawerContent(content);
        setButtonNumber(number);
        setOpenDrawer(true);
    };

    const onCloseDrawer = () => {
        setOpenDrawer(false);
    };

    const handleParkingEntry = async () => {
        try {
            const values = await form.validateFields();
            const formData = {
                customerData: {
                    firstname_owner: values.firstname_owner,
                    lastname_owner: values.lastname_owner,
                    phone_number: values.phone_number,
                },
                vehicleData: {
                    license_plate: `${values.type_plate}-${values.license_plate}`,
                    type: values.type,
                    brand: values.brand,
                    color: values.color,
                },
                parkingSpaceData: {
                    state: 'Ocupado',
                    parking_space_id: buttonNumber,
                },
            };
    
            const response = await fetch(import.meta.env.VITE_APP_API_URL_PARKING_SPACE_ENTRY, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Datos guardados exitosamente:', data);
                setDrawerContent(null);
                form.resetFields();
                onCloseDrawer();
            } else {
                console.error('Error al guardar los datos:', data);
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    };        

    const renderDrawerContent = () => {
        return (
            <Drawer
                title={`Espacio de parqueo ${buttonNumber}`}
                width={610}
                onClose={onCloseDrawer}
                visible={openDrawer}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onCloseDrawer}>Cancelar</Button>
                        <Button onClick={() => handleParkingEntry()} type="primary">Guardar</Button>
                    </Space>
                }
            >
                <Form form={form} layout="vertical" hideRequiredMark>
                    <Typography.Title level={3}>
                        Cliente
                    </Typography.Title>
                    <Divider />
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="firstname_owner"
                                label="Nombre"
                                rules={[
                                    {
                                        required: true,
                                        message: '¡Por favor ingrese el nombre del cliente!',
                                    },
                                ]}
                            >
                                <Input placeholder="Nombre del cliente" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="lastname_owner"
                                label="Apellido"
                                rules={[
                                    {
                                        required: true,
                                        message: '¡Por favor ingrese el apellido del cliente!',
                                    },
                                ]}
                            >
                                <Input placeholder="Apellido del cliente" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="phone_number"
                                label="Número de teléfono"
                            >
                                <Input placeholder="Número de teléfono del cliente" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Typography.Title level={3}>
                        Vehículo
                    </Typography.Title>
                    <Divider />
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item 
                                label="Placa" 
                                name="license_plate"
                                rules={[
                                    {
                                        required: true,
                                        message: '¡Por favor ingresa el número de placa del vehículo!',
                                    },
                                ]}
                            >
                                <Input placeholder="Número de placa del vehículo"/>
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
                                <Select placeholder="Tipo de placa del vehículo">
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
                    <Col span={12}>
                        <Form.Item label="Tipo de Vehículo" name="type">
                            <Select placeholder="Tipo de vehículo">
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
                    </ Col>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Marca" name="brand">
                                <Select placeholder="Marca del vehículo">
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
                                <Select placeholder="Marca del vehículo">
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
                </Form>
            </Drawer>
        );
    };

    return (
        <Layout>
            <Header className='home-header-dashboard'>
                <TopMenu />
            </Header>
            <Layout>
                <Layout.Sider>
                    <LeftMenu />
                </Layout.Sider>
                <Layout.Content>
                    <ConfigProvider
                        button={{
                            style: {
                                width: buttonWidth,
                                height: buttonHeight,
                                margin: 6,
                            },
                        }}
                    >
                        <div className="park-spaces-container">
                            <div
                                style={{
                                    marginInlineStart: buttonWidth,
                                }}
                            >
                                {[...Array(14)].map((_, index) => (
                                    <Button key={index} onClick={() => showDrawer(renderDrawerContent(), index + 6)}>{index + 6}</Button>
                                ))}
                            </div>
                            <div
                                style={{
                                    marginInlineStart: buttonWidth * -5,
                                }}
                            >
                                {[...Array(5)].map((_, index) => (
                                    <Button key={index} onClick={() => showDrawer(renderDrawerContent(), index + 1)}>{index + 1}</Button>
                                ))}
                            </div>
                        </div>
                    </ConfigProvider>
                    {renderDrawerContent()}
                    <div className="center-right-container-parking">
                        <Row gutter={20}>
                            <Col span={40}>
                                <Card bordered={false}>
                                    <Statistic
                                        title="Porcentaje de parqueo en uso"
                                        value={100}
                                        valueStyle={{
                                            color: '#3f8600',
                                        }}
                                        suffix="%"
                                        style={{ marginBottom: 20 }}
                                    />
                                    <Statistic
                                        title="Porcentaje de parqueo en desuso"
                                        value={0}
                                        valueStyle={{
                                            color: '#cf1322',
                                        }}
                                        style={{ marginBottom: 20 }}
                                        suffix="%"
                                    />
                                    <Statistic
                                        title="Espacios de parqueo libres"
                                        value={19}
                                        valueStyle={{
                                            color: '#3f8600',
                                        }}
                                        style={{ marginBottom: 20 }}
                                    />
                                    <Statistic
                                        title="Espacios de parqueo ocupados"
                                        value={0}
                                        valueStyle={{
                                            color: '#cf1322',
                                        }}
                                        style={{ marginBottom: 20 }}
                                    />
                                    <Statistic
                                        title="Porcentaje de parqueo en uso"
                                        value={100}
                                        valueStyle={{
                                            color: '#3f8600',
                                        }}
                                        suffix="%"
                                        style={{ marginBottom: 20 }}
                                    />
                                    <Statistic
                                        title="Porcentaje de parqueo en uso"
                                        value={100}
                                        valueStyle={{
                                            color: '#cf1322',
                                        }}
                                        suffix="%"
                                        style={{ marginBottom: 20 }}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default ParkingSpaces;
