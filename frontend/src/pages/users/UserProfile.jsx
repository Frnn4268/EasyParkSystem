import React, { useState, useEffect } from 'react';
import { Layout, Typography, Form, Input, Button, Upload, message, Row, Col, Card, Image, Space } from 'antd';
import { 
    UserOutlined, 
    MailOutlined, 
    SaveOutlined, 
    InboxOutlined,
    DownloadOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    SwapOutlined,
    ZoomInOutlined,
    ZoomOutOutlined
} from '@ant-design/icons';
import axios from 'axios';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import { useAuth } from '../../contexts/AuthContext.jsx';

import '../../css/DashboardMenu.css';
import '../../css/User.css';

const { Header, Content } = Layout;
const { Dragger } = Upload;

const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

const UserProfile = () => {
    const [form] = Form.useForm();
    const { userData } = useAuth();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('');
            userData(response.data);
            form.setFieldsValue({
                name: response.data.name,
                email: response.data.email,
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const onFinish = (values) => {
        console.log('Received values:', values);
        message.success('Perfil actualizado exitosamente');
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Solo puedes subir archivos JPG/PNG!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('La imagen debe ser más pequeña que 2MB!');
        }
        return isJpgOrPng && isLt2M;
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
                <Content className='layout-content-user'>
                    <Typography.Title className='table-title-user' level={2}>
                        Perfil de Usuario
                    </Typography.Title>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            {userData && (
                                <Form
                                    form={form}
                                    name="profile_form"
                                    layout="vertical"
                                    onFinish={onFinish}
                                    initialValues={{
                                        name: userData.name,
                                        email: userData.email,
                                    }}
                                >
                                    <Form.Item
                                        label="Nombre"
                                        name="name"
                                        rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
                                    >
                                        <Input prefix={<UserOutlined />} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Correo electrónico"
                                        name="email"
                                        rules={[{ required: true, message: 'Por favor ingresa tu correo electrónico' }]}
                                    >
                                        <Input prefix={<MailOutlined />} />
                                    </Form.Item>
                                    <Dragger>
                                        <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Haga clic o arrastre la imagen de perfil a esta área para cargarla.</p>
                                        <p className="ant-upload-hint">
                                        Soporte para una carga única o masiva. Está estrictamente prohibido cargar datos de la empresa u otros
                                        archivos prohibidos.
                                        </p>
                                    </Dragger>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} style={{ marginTop: 25 }}>
                                            Guardar Perfil
                                        </Button>
                                    </Form.Item>
                                </Form>
                            )}
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Card>
                            {userData && (
                                <Form
                                    form={form}
                                    name="profile_form"
                                    layout="vertical"
                                    onFinish={onFinish}
                                    initialValues={{
                                        name: userData.name,
                                        email: userData.email,
                                        role: userData.role,
                                        active: userData.active
                                    }}
                                >
                                    <Typography.Text strong>Nombre:</Typography.Text>
                                        <Typography.Text>{userData.name}</Typography.Text>
                                        <br />
                                        <Typography.Text strong>Correo electrónico:</Typography.Text>
                                        <Typography.Text>{userData.email}</Typography.Text>
                                        <br />
                                        <Typography.Text strong>Rol:</Typography.Text>
                                        <Typography.Text>{userData.role}</Typography.Text>
                                        <br />
                                        <Typography.Text strong>Estado:</Typography.Text>
                                        <Typography.Text>{userData.active}</Typography.Text>
                                        <br />
                                    <Image
                                        width={200}
                                        src={src}
                                        preview={{
                                            toolbarRender: (
                                            _,
                                            {
                                                transform: { scale },
                                                actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
                                            },
                                            ) => (
                                            <Space size={12} className="toolbar-wrapper">
                                                <DownloadOutlined onClick={'onDownload'} />
                                                <SwapOutlined rotate={90} onClick={onFlipY} />
                                                <SwapOutlined onClick={onFlipX} />
                                                <RotateLeftOutlined onClick={onRotateLeft} />
                                                <RotateRightOutlined onClick={onRotateRight} />
                                                <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                                                <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                                            </Space>
                                            ),
                                        }}
                                    />
                                </Form>
                            )}
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};

export default UserProfile;
