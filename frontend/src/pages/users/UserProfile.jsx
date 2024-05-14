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

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import { useAuth } from '../../contexts/AuthContext.jsx';

import '../../css/DashboardMenu.css';
import '../../css/User.css';

const { Header, Content } = Layout;
const { Dragger } = Upload;

const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

const UserProfile = () => {
    const [user, setUser] = useState([]);
    const [password, setPassword] = useState(''); // Estado para almacenar la contraseña
    const { userData } = useAuth();
    const [form] = Form.useForm();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_USER_PROFILE}/${userData._id}`);
            if (response.ok) {
                const data = await response.json();
                setUser(data.data);
                setPassword(data.data.password); // Almacenar la contraseña en el estado
                form.setFieldsValue({
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    password: response.data.password
                });
            } else {
                console.error('Error getting users');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onFinish = async (values) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_USER_PROFILE}/${userData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                await fetchUserData(); 
                message.success('Usuario editado exitosamente.');
            } else {
                console.error('Error updating user');
            }
        } catch (error) {
            console.error('Error processing request:', error);
        }
    };

    const beforeUpload = (file) => {
        // Verificar el tipo y tamaño del archivo
        // Resto del código...
    };

    const compareToFirstPassword = (_, value) => {
        const { form } = _;
        if (value && value !== form.getFieldValue('password')) {
            return Promise.reject('Las contraseñas no coinciden');
        }
        return Promise.resolve();
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
                                        label="Nombre: "
                                        name="name"
                                        rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
                                    >
                                        <Input prefix={<UserOutlined />} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Correo electrónico: "
                                        name="email"
                                        rules={[{ required: true, message: 'Por favor ingresa tu correo electrónico' }]}
                                    >
                                        <Input prefix={<MailOutlined />} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Contraseña: "
                                        name="password"
                                        rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
                                    >
                                        <Input.Password prefix={<MailOutlined />} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Confirmación de contraseña: "
                                        name="confirmPassword"
                                        dependencies={['password']}
                                        rules={[
                                            { required: true, message: 'Por favor ingresa de nuevo tu contraseña' },
                                            { validator: compareToFirstPassword }
                                        ]}
                                    >
                                        <Input.Password prefix={<MailOutlined />} />
                                    </Form.Item>
                                    <Dragger beforeUpload={beforeUpload}>
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
                                        <Button 
                                            type="primary" 
                                            htmlType="submit"
                                             icon={<SaveOutlined />} 
                                             style={{ marginTop: 25 }}
                                        >
                                            Guardar Perfil
                                        </Button>
                                    </Form.Item>
                                </Form>
                            )}
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Card>
                            {userData && (
                                <div>
                                    <Typography.Text strong>Id:</Typography.Text>
                                    <Typography.Text>{userData._id}</Typography.Text>
                                    <br />
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
                                    <Typography.Text>{userData.active ? 'Activo' : 'Inactivo'}</Typography.Text>
                                    <br />
                                    <Typography.Text strong>Contraseña:</Typography.Text>
                                    <Typography.Text>{password}</Typography.Text> 
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
                                </div>
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
