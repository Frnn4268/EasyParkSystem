import React, { useState, useEffect } from 'react';
import { Layout, Button, ConfigProvider, Drawer, Space, Col, Form, Input, Row, Select, Card, Statistic, Typography, Divider, Tag, Modal, Popover, QRCode } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

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
    const [parkingSpaceStates, setParkingSpaceStates] = useState({});
    const [selectedParkingSpaceState, setSelectedParkingSpaceState] = useState(null);
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [selectedButtonId, setSelectedButtonId] = useState(null); 
    const [parkingSpaceDetails, setParkingSpaceDetails] = useState(null);
    const [form] = Form.useForm();

    const [parkingStatistics, setParkingStatistics] = useState({
        usagePercentage: 0,
        unusedPercentage: 0,
        freeSpaces: 0,
        occupiedSpaces: 0
    });

    const [parkingAverageTime, setParkingAverageTime] = useState({
        averageParkingTime: 0
    });

    const [totalCustomersToday, setTotalCustomersToday] = useState({
        totalCustomersToday: 0
    });

    useEffect(() => {
        fetchData();
        fetchParkingStatistics();
        fetchAverageParkingTime();
        fetchTotalCustomersToday();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_PARKING_SPACE_ENTRY}/state`);
            const data = await response.json();
            const latestParkingSpaces = data.parkingSpaces;

            const parkingSpaceStatesCopy = {};
            latestParkingSpaces.forEach(space => {
                parkingSpaceStatesCopy[space.parking_space_id] = space.state;
            });

            setParkingSpaceStates(parkingSpaceStatesCopy);
        } catch (error) {
            console.error('Error al obtener los datos del estado de los espacios de parqueo:', error);
        }
    };

    const fetchParkingStatistics = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_PARKING_SPACE_ENTRY}/state`);
            const data = await response.json();
            const parkingSpaces = data.parkingSpaces;
    
            let occupiedCount = 0;
            let availableCount = 0;
    
            parkingSpaces.forEach(space => {
                if (space.state === 'Ocupado') {
                    occupiedCount++;
                } else if (space.state === 'Disponible') {
                    availableCount++;
                }
            });
    
            const totalSpaces = occupiedCount + availableCount;
    
            const usagePercentage = ((occupiedCount / totalSpaces) * 100).toFixed(2);
            const unusedPercentage = ((availableCount / totalSpaces) * 100).toFixed(2);
    
            setParkingStatistics({
                usagePercentage: isNaN(usagePercentage) ? 0 : usagePercentage,
                unusedPercentage: isNaN(unusedPercentage) ? 0 : unusedPercentage,
                freeSpaces: availableCount,
                occupiedSpaces: occupiedCount
            });
        } catch (error) {
            console.error('Error al obtener las estadísticas del parqueo:', error);
        }
    };    

    const fetchAverageParkingTime = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_PARKING_SPACE_ENTRY}/average-time`);
            const data = await response.json();
    
            console.log(data);
    
            const averageParkingTime = parseFloat(data.averageParkingTime);
            const formattedAverageParkingTime = averageParkingTime.toFixed(2);
    
            setParkingAverageTime(prevState => ({
                ...prevState,
                averageParkingTime: formattedAverageParkingTime
            }));
        } catch (error) {
            console.error('Error al obtener el tiempo promedio de estacionamiento:', error);
        }
    };

    const fetchTotalCustomersToday = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_PARKING_SPACE_ENTRY}/total-customers`);
            const data = await response.json();

            const totalCustomersToday = data.totalCustomersToday;
            setTotalCustomersToday(totalCustomersToday);

            setTotalCustomersToday(prevState => ({
                ...prevState,
                totalCustomersToday: data.totalCustomersToday
            }));
        } catch (error) {
            console.error('Error al obtener el total de clientes hoy:', error);
        }
    };

    const showDrawer = async (content, id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_PARKING_SPACE_ENTRY}/${id}`);
            const data = await response.json();

            setDrawerContent(content);
            setButtonNumber(id);
            setSelectedParkingSpaceState(data.parkingSpace.state);
            
            setParkingSpaceStates(prevState => ({
                ...prevState,
                [id]: data.parkingSpace.state
            }));
            
            setOpenDrawer(true);
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            setSelectedParkingSpaceState(null);
            setOpenDrawer(true);
        }
    };
    
    const onCloseDrawer = () => {
        setOpenDrawer(false);
        form.resetFields(); 
        fetchData()
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
                fetchData();
                fetchParkingStatistics(); 
                fetchTotalCustomersToday();
            } else {
                console.error('Error al guardar los datos:', data);
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    };   
    
    const editParkingSpaceState = async (id, newState) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_PARKING_SPACE_ENTRY}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ state: newState }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Estado del espacio de estacionamiento actualizado exitosamente:', data);
                fetchData();
                fetchParkingStatistics(); 
                fetchAverageParkingTime();
            } else {
                console.error('Error al actualizar el estado del espacio de estacionamiento:', data);
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    };  

    const handleParkingSpaceClick = async (index) => {
        setSelectedButtonIndex(index);
        setSelectedButtonId(index); 

        if (parkingSpaceStates[index] === 'Ocupado') {
            try {
                const response = await fetch(`${import.meta.env.VITE_APP_API_URL_PARKING_TIME_CUSTOMER}/${index}`);
                const data = await response.json();

                setParkingSpaceDetails(data.id);

                console.log(setParkingSpaceDetails)

                setConfirmVisible(true); 
            } catch (error) {
                console.error('Error al obtener los detalles del espacio de parqueo:', error);
            }
        } else {
            showDrawer(renderDrawerContent(), index);
        }
    };

    const handleConfirm = () => {
        editParkingSpaceState(selectedButtonIndex, 'Disponible');
        setConfirmVisible(false); 
    };

    const handleCancel = () => {
        setConfirmVisible(false); 
    };

    const getButtonColor = (id) => {
        const spaceState = parkingSpaceStates[id];
        return spaceState === 'Ocupado' ? 'red' : 'green';
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
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: '13%', flexDirection: 'column' }}>
                        <div style={{ marginLeft: 'auto' }}>
                            Estado del espacio de estacionamiento:  
                            <Tag color={selectedParkingSpaceState === 'Ocupado' ? 'red' : 'green'}>
                                {selectedParkingSpaceState}
                            </Tag>
                        </div>
                    </div>
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
                                    <Button 
                                        key={index}
                                        onClick={() => handleParkingSpaceClick(index + 6)}
                                        style={{ 
                                            backgroundColor: getButtonColor(index + 6), 
                                            color: 'white',
                                            fontWeight: 'bold',
                                            borderColor: 'white'
                                        }}
                                    >
                                        {index + 6}
                                    </Button>
                                ))}
                            </div>
                            <div
                                style={{
                                    marginInlineStart: buttonWidth * -5,
                                }}
                            >
                                {[...Array(5)].map((_, index) => (
                                    <Button 
                                        key={index}
                                        onClick={() => handleParkingSpaceClick(index + 1)}
                                        style={{ 
                                            backgroundColor: getButtonColor(index + 1), 
                                            color: 'white',
                                            fontWeight: 'bold',
                                            borderColor: 'white'
                                        }}
                                    >
                                        {index + 1}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </ConfigProvider>
                    {renderDrawerContent()}
                    <Modal
                        title="¿Está seguro de que desea liberar este espacio de parqueo?"
                        visible={confirmVisible}
                        onOk={handleConfirm}
                        onCancel={handleCancel}
                        okText="Confirmar"
                        cancelText="Cancelar"

                        okType="danger"
                        icon={<ExclamationCircleOutlined />}
                    >
                        <p>Ha seleccionado el espacio de parqueo número: {selectedButtonId}</p>
                        <Popover
                            overlayInnerStyle={{
                            padding: 0,
                            width: 400,
                            height: 410
                            }}
                            content={
                                <div>
                                    <QRCode 
                                        value={`${import.meta.env.VITE_APP_API_URL_PARKING_TIME_CUSTOMER_VIEW}/${parkingSpaceDetails}`} 
                                        bordered={false} 
                                        color='blue'
                                        bgColor='white'
                                        style={{ width: 350, height: 350,  margin: '0px 0px 0px 25px' }}
                                    />
                                    <Input
                                        placeholder="-"
                                        value={`${import.meta.env.VITE_APP_API_URL_PARKING_TIME_CUSTOMER_VIEW}/${parkingSpaceDetails}`}
                                        style={{ width: 350, height: 35, margin: '7.5px 0px 0px 25px' }}
                                    />
                                </div>
                            }
                        > 
                            <Button type="primary" ghost style={{ position: 'fixed' }}>Código QR Cliente</Button>
                        </Popover>
                    </Modal>
                    <div className="center-right-container-parking">
                        <Row gutter={20} style={{ marginTop: 50 }}>
                            <Col span={40}>
                                <Card bordered={false}>
                                    <Statistic
                                        title="Porcentaje de parqueo disponible"
                                        value={parkingStatistics.unusedPercentage}
                                        valueStyle={{
                                            color: '#3f8600',
                                        }}
                                        style={{ marginBottom: 20 }}
                                        suffix="%"
                                    />
                                    <Statistic
                                        title="Porcentaje de parqueo ocupado"
                                        value={parkingStatistics.usagePercentage}
                                        valueStyle={{
                                            color: '#cf1322',
                                        }}
                                        suffix="%"
                                        style={{ marginBottom: 20 }}
                                    />
                                    <Statistic
                                        title="Espacios de parqueo libres"
                                        value={parkingStatistics.freeSpaces}
                                        valueStyle={{
                                            color: '#3f8600',
                                        }}
                                        style={{ marginBottom: 20 }}
                                    />
                                    <Statistic
                                        title="Espacios de parqueo ocupados"
                                        value={parkingStatistics.occupiedSpaces}
                                        valueStyle={{
                                            color: '#cf1322',
                                        }}
                                        style={{ marginBottom: 20 }}
                                    />
                                    <Statistic
                                        title="Tiempo promedio de estacionado"
                                        value={parkingAverageTime.averageParkingTime}
                                        valueStyle={{
                                            color: '#005FFF',
                                        }}
                                        suffix="min"
                                        style={{ marginBottom: 20 }}
                                    />
                                    <Statistic
                                        title="Total de clientes registrados hoy"
                                        value={totalCustomersToday.totalCustomersToday}
                                        valueStyle={{
                                            color: '#C58118',
                                        }}
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
