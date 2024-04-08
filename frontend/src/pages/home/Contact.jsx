import React, { useState } from 'react';
import { Row, Col, Button, Form, Input, AutoComplete, Layout, Card, Typography, message } from 'antd';
const { TextArea } = Input;

import MainMenu from './MainMenu'; 
import form_home from '../../assets/home/form_card1.png';

import '../../css/Home.css';

const { Header, Content } = Layout;

const backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1.5)), url(${form_home})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    borderRadius: '0 100% 25% 15%'
};

const Contact = () => {
    const [options, setOptions] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    const handleSearch = (value) => {
        setOptions(() => {
            if (!value || value.includes('@')) {
                return [];
            }
            return ['gmail.com', 'hotmail.com', 'outlook.com'].map((domain) => ({
                label: `${value}@${domain}`,
                value: `${value}@${domain}`,
            }));
        });
    };

    const success = () => {
        messageApi
            .loading('Enviando mensaje...', 2.5)
            .then(() => message.success('Mensaje enviado correctamente', 2.5))
            .catch(() => message.error('Error al enviar el mensaje', 2.5));
    };

    const handleSubmit = async (values) => {
        try {
            const response = await fetch(import.meta.env.VITE_APP_API_URL_CONTACT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                success();
            } else {
                throw new Error('Error al enviar el mensaje');
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <>
            <Layout className="layout" style={backgroundStyle}>    
                <Header className='home-header'> 
                    <MainMenu />
                </Header>
                <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                    <Card className="home-block-section">
                        <Typography.Title level={3} strong className='title' style={{textAlign: 'center'}}>
                            Contacto
                        </Typography.Title>
                        <Typography.Title level={5} strong className='title' style={{textAlign: 'center'}}>
                            Contáctanos para obtener más información.
                        </Typography.Title>
                        <Row justify="space-around">
                            <Col xs={22} sm={18} md={16} lg={8}>
                                <Form layout="vertical" onFinish={handleSubmit}>
                                    <Form.Item 
                                        label='Nombre completo' 
                                        name='name' 
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Por favor ingresa tu nombre'
                                            }
                                        ]}
                                    >
                                        <Input size='large' placeholder='Ingresa tu nombre completo'/>
                                    </Form.Item>
                                    <Form.Item
                                        label='Email'
                                        name='email'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Por favor ingresa tu email',
                                            },
                                            {
                                                type: 'email',
                                                message: 'Este no es un email válido',
                                            },
                                        ]}
                                    >
                                        <AutoComplete
                                            size='large'
                                            style={{ width: '100%' }}
                                            onSearch={handleSearch}
                                            placeholder="Email"
                                            options={options}
                                        />
                                    </Form.Item>
                                    <Form.Item 
                                        label="Mensaje"
                                        name="message"
                                        rules={[
                                            { 
                                                required: true, 
                                                message: 'Por favor ingresa tu mensaje.' 
                                            }
                                        ]}
                                    >
                                        <TextArea placeholder="Tu mensaje" rows={5} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type='primary' size='large' className='btn' htmlType="submit">
                                            Enviar
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </Card>
                </Content>
                {contextHolder}
            </Layout>
        </>
    );
}

export default Contact;
