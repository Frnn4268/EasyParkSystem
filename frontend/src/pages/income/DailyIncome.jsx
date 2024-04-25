import React from 'react';
import { Row, Col, Button, Form, Input, Layout, Card, Typography, message, DatePicker, Statistic } from 'antd';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DailyIncome.css';

const { Header } = Layout;
const { useForm } = Form;

const DailyIncome = () => {
    const [form] = useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi
            .loading('Guardando ingreso...', 2.5)
            .then(() => {
                message.success('Ingreso guardado correctamente', 2.5);
                form.resetFields(); 
            })
            .catch(() => message.error('Error al guardar el ingreso', 2.5));
    };

    const handleSubmit = async (values) => {
        try {
            const { date, income } = values;
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
                                        <Input
                                            size='large'
                                            placeholder='Ingresa el monto'
                                            addonBefore='Q'
                                            type='number'
                                            step='0.1'
                                            min='0'
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
                </Layout.Content>
            </Layout>
            {contextHolder}
        </Layout>
    );
};

export default DailyIncome;
