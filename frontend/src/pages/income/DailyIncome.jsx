import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form, Layout, Card, Typography, message, DatePicker, InputNumber, Statistic } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import moment from 'moment'; 

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DailyIncome.css';

const { Header } = Layout;
const { useForm } = Form;

const DailyIncome = () => {
    const [form] = useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [income, setIncome] = useState(0); 
    const [lastSavedIncome, setLastSavedIncome] = useState(0); 
    const [lastDateIncome, setLastDateIncome] = useState(null); 

    const success = () => {
        messageApi
            .loading('Guardando ingreso...', 2.5)
            .then(() => {
                message.success('Ingreso guardado correctamente', 2.5);
                form.resetFields();
                setLastSavedIncome(income); 
            })
            .catch(() => message.error('Error al guardar el ingreso', 2.5));
    };

    const parseIncome = (value) => {
        const parsedValue = value.replace(/[^\d.]/g, '');
        return parseFloat(parsedValue).toFixed(2);
    };

    useEffect(() => {
        fetchLastIncome();
    }, []); 

    const fetchLastIncome = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_INCOME}/last-income`);
            const data = await response.json();
            if (data.status === 'success') {
                setIncome(data.data.income);
                setLastSavedIncome(data.data.income); 
                setLastDateIncome(moment(data.data.hour_date).format('YYYY-MM-DD HH:mm:ss')); 
            } else {
                throw new Error('Error al obtener el último ingreso');
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const handleSubmit = async (values) => {
        try {
            const { date } = values;
            const day = date.date();
            const month = date.month() + 1; 
            const year = date.year();
            
            const response = await fetch(import.meta.env.VITE_APP_API_URL_INCOME, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    day,
                    month,
                    year,
                    income 
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
            <Header className='daily-income-header-dashboard'>
                <TopMenu />
            </Header>
            <Layout>
                <Layout.Sider>
                    <LeftMenu />
                </Layout.Sider>
                <Layout.Content>
                    <Card className="daily-income-block-section">
                        <Typography.Title level={2} strong className='daily-income-title' style={{textAlign: 'center'}}>
                            Ingreso Monetario
                        </Typography.Title>
                        <Row justify="space-around">
                            <Col xs={22} sm={18} md={16} lg={8}>
                                <Form layout="vertical" onFinish={handleSubmit} form={form}>
                                    <Form.Item 
                                        label='Fecha de ingreso' 
                                        name='date' 
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Por favor selecciona la fecha'
                                            }
                                        ]}
                                        style={{ marginTop: 15 }}
                                    >
                                        <DatePicker 
                                            format="YYYY-MM-DD" 
                                            style={{ width: '100%' }}  
                                            placeholder='Selecciona la fecha'
                                        />
                                    </Form.Item>
                                    <Form.Item 
                                        label='Monto monetario'
                                        name='income'
                                        rules={[
                                            { 
                                                required: true, 
                                                message: 'Por favor ingresa el monto.' 
                                            }
                                        ]}
                                    >
                                        <InputNumber
                                            size='large'
                                            placeholder='Ingresa el monto'
                                            defaultValue={0}
                                            value={income} 
                                            formatter={(value) => `Q ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={parseIncome} 
                                            onChange={setIncome} 
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
                                    title="Último Ingreso"
                                    value={`Q ${lastSavedIncome}`} 
                                    precision={2}
                                    valueStyle={{
                                        color: '#3f8600',
                                    }}
                                    prefix={<ArrowUpOutlined />}
                                />
                                <Statistic
                                    title="Fecha y Hora"
                                    value={lastDateIncome ? moment(lastDateIncome).format('YYYY-MM-DD HH:mm:ss') : '-'}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Layout.Content>
            </Layout>
            {contextHolder}
        </Layout>
    );
};

export default DailyIncome;
