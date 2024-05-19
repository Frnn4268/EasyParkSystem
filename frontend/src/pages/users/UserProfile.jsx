import React, { useState } from 'react';
import { Layout, Typography, Form, Input, Button, Row, Col, Card, Descriptions, Avatar, Space, Tabs, List, Collapse, Badge } from 'antd';
import { UserOutlined, MailOutlined, SaveOutlined, LockOutlined, EditOutlined, PieChartOutlined, LineChartOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import { useAuth } from '../../contexts/AuthContext.jsx';

import '../../css/DashboardMenu.css';
import '../../css/User.css';

const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const UserProfile = () => {
    const { userData } = useAuth();
    const [form] = Form.useForm();
    const [activityData, setActivityData] = useState([
        'Inicio de sesión'
    ]);

    const addActivity = (activity) => {
        setActivityData((prevActivityData) => [activity, ...prevActivityData]);
    };

    const handleSaveProfile = (values) => {
        console.log(values);
        addActivity('Actualización de perfil');
        addActivity('Contraseña actualizada');
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
                        Editar Perfil
                    </Typography.Title>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Card
                                title={<Space>
                                    <Avatar
                                        style={{
                                            backgroundColor: '#87d068',
                                        }}
                                        icon={<UserOutlined />}
                                    /> 
                                    Actualizar Perfil
                                    </Space>}
                                extra={<EditOutlined />}
                                bordered={false}
                            >
                                <Form
                                    form={form}
                                    name="profile_form"
                                    layout="vertical"
                                    onFinish={handleSaveProfile}
                                >
                                   <Form.Item
                                        label="Nombre: "
                                        name="name"
                                        rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
                                    >
                                        <Input 
                                            prefix={<UserOutlined />} 
                                            placeholder={userData.name} 
                                        />
                                    </Form.Item>
                                    <Form.Item
                                    label="Correo electrónico: "
                                        name="email"
                                        rules={[{ required: true, message: 'Por favor ingresa tu correo electrónico' }]}
                                    >
                                        <Input 
                                            prefix={<MailOutlined />} 
                                            placeholder={userData.email} 
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Contraseña: "
                                        name="password"
                                        rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
                                    >
                                        <Input.Password prefix={<LockOutlined />} />
                                    </Form.Item>
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
                            </Card>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Tabs defaultActiveKey="1">
                            <TabPane tab={<span><PieChartOutlined />Perfil</span>} key="1">
                                <Card title="Perfil de Usuario" bordered={false}>
                                    <Descriptions bordered>
                                        <Descriptions.Item label="Id" span={3}>{userData._id}</Descriptions.Item>
                                        <Descriptions.Item label="Nombre" span={3}>{userData.name}</Descriptions.Item>
                                        <Descriptions.Item label="Correo electrónico" span={3}>{userData.email}</Descriptions.Item>
                                        <Descriptions.Item label="Rol" span={3}>{userData.role}</Descriptions.Item>
                                        <Descriptions.Item label="Estado" span={3}>
                                            <Badge status={userData.active ? "success" : "error"} text={userData.active ? "Activo" : "Inactivo"} />
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </TabPane>
                                <TabPane tab={<span><LineChartOutlined />Actividad Reciente</span>} key="2">
                                    <List
                                        size="small"
                                        bordered
                                        dataSource={activityData}
                                        renderItem={item => <List.Item>{item}</List.Item>}
                                    />
                                </TabPane>
                                <TabPane tab={<span><QuestionCircleOutlined /> Información</span>} key="4">
                                    <Collapse>
                                        <Panel header="Información de Privacidad" key="1">
                                            <p>En esta sección, nos tomamos muy en serio tu privacidad. Por eso, no mostramos información sensible como contraseñas ni datos personales. Puedes estar tranquilo sabiendo que tus datos están protegidos y seguros con nosotros.</p>
                                        </Panel>
                                        <Panel header="Información de Notificaciones" key="2">
                                            <p>Para cualquier problema técnico o duda que tengas sobre EasyPark, no dudes en contactar con tu administrador. Estamos aquí para ayudarte y asegurarnos de que recibas la información que necesitas de la manera que prefieras.</p>
                                        </Panel>
                                    </Collapse>
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};

export default UserProfile;
