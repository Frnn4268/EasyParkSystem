import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form, Layout, Card, Typography, message, InputNumber, Statistic } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import moment from 'moment'; 

import TopMenu from '../dashboard/TopMenu.jsx'
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DashboardMenu.css'
import '../../css/ParkingPriceComponent.css';

const { Header } = Layout;
const { useForm } = Form;

const ParkingPriceComponent = () => {
    const [form] = useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [parkingPrice, setParkingPrice] = useState(0); 
    const [lastSavedParkingPrice, setLastSavedParkingPrice] = useState(0); 
    const [lastDateParkingPrice, setLastDateParkingPrice] = useState(null); 

    const success = async () => {
        messageApi
            .loading('Guardando precio de parqueo...', 2.5)
            .then(async () => {
                message.success('Precio de parqueo guardado correctamente', 2.5);
                form.resetFields();
                setLastSavedParkingPrice(parkingPrice);
                await fetchLastParkingIncome(); 
            })
            .catch(() => message.error('Error al guardar el precio de parqueo', 2.5));
    };

    useEffect(() => {
        fetchLastParkingIncome();
    }, []); 

    const fetchLastParkingIncome = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking-price/last-parking-price`); 
            const data = await response.json();
            if (data.status === 'success') {
                setParkingPrice(data.data.price);
                setLastSavedParkingPrice(data.data.price); 
                setLastDateParkingPrice(moment(data.data.hour_date).format('YYYY-MM-DD HH:mm:ss'));
            } else {
                throw new Error('Error al obtener el último precio de parqueo');
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const handleSubmit = async (values) => {
        try {
            const { price, time_in_hours } = values;

            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking-price`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    price: price,
                    time_in_hours: time_in_hours,
                }),
            });

            if (response.ok) {
                success();
            } else {
                throw new Error('Error al guardar el ingreso de dinero');
            }
        } catch (error) {
            message.error(error.message);
        }
    };      

    return (
        <Layout>
            <Header className='parking-price-header-dashboard'>
                <TopMenu />
            </Header>
            <Layout>
                <Layout.Sider>
                    <LeftMenu />
                </Layout.Sider>
                <Layout.Content>
                    <Card className="parking-price-block-section">
                        <Typography.Title level={2} strong className='parking-price-title' style={{textAlign: 'center'}}>
                            Precio de Tiempo de Estacionamiento
                        </Typography.Title>
                        <Row justify="space-around">
                            <Col xs={22} sm={18} md={16} lg={8}>
                                <Form layout="vertical" onFinish={handleSubmit} form={form}>
                                    <Form.Item 
                                        label='Precio:' 
                                        name='price' 
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Por favor ingresa el precio'
                                            }
                                        ]}
                                        style={{ marginTop: 15 }}
                                    >
                                        <InputNumber
                                            size='large'
                                            placeholder='Ingresa el precio'
                                            defaultValue={0}
                                            formatter={(value) => `Q ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={(value) => value.replace(/\Q\s?|(,*)/g, '')} 
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                    <Form.Item 
                                        label='Tiempo:' 
                                        name='time_in_hours' 
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Por favor ingresa la cantidad en horas'
                                            }
                                        ]}
                                        style={{ marginTop: 15 }}
                                    >
                                        <InputNumber
                                            size='large'
                                            placeholder='Ingresa la cantidad en horas'
                                            defaultValue={0}
                                            formatter={value => `${value} horas`}
                                            parser={value => value.replace(' horas', '')}
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type='primary' size='large' className='btn' htmlType="submit">
                                            Guardar
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </Card>
                    <Row gutter={10} style={{ marginLeft: '4.5%', width: '100%' }}>
                        <Col span={6}>
                            <Card bordered={false}>
                                <Statistic
                                    title="Último precio de Estacionamiento"
                                    value={`Q ${lastSavedParkingPrice}/hora`} 
                                    precision={2}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    prefix={<ArrowUpOutlined />}
                                />
                                <Statistic
                                    title="Fecha y Hora"
                                    value={lastDateParkingPrice ? moment(lastDateParkingPrice).format('YYYY-MM-DD HH:mm:ss') : '-'}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Layout.Content>
            </Layout>
            {contextHolder}
        </Layout>
    );
}

export default ParkingPriceComponent;
