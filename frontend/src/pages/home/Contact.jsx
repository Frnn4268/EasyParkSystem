import React from 'react'
import { Row, Col, Button, Form, Input, AutoComplete, Layout } from 'antd';
const { TextArea } = Input
import { Link } from 'react-router-dom'

import MainMenu from './MainMenu'; 

import '../../css/Home.css';

const { Header, Content } = Layout;

const Contact = () => {
    const [options, setOptions] = React.useState([]);
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

    return (
        <>
            <Layout className="layout">
                <Header className='home-header'> {/* Agrega el componente MainMenu dentro del Header */}
                    <MainMenu />
                </Header>
                <Content>
                    <Row justify="space-around">
                        <Col xs={22} sm={18} md={16} lg={8}>
                            <Form layout="vertical">
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
                                    <Link to='/'>
                                        <Button type='primary' size='large' className='btn'>
                                            Enviar
                                        </Button>
                                    </Link>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </>
    );
}

export default Contact;
