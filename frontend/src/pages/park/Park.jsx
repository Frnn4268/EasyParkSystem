import React, { useState } from 'react';
import { Layout, Button, ConfigProvider, Drawer, Space, Col, Form, Input, Row, Select, Card, Statistic } from 'antd';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DashboardMenu.css';
import '../../css/Park.css';

const { Header } = Layout;
const { Option } = Select;

const buttonWidth = 60;
const buttonHeight = 120;

const renderForm = () => {
    return (
        <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter user name',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter user name" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="url"
                        label="Url"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter url',
                            },
                        ]}
                    >
                        <Input
                            style={{
                                width: '100%',
                            }}
                            addonBefore="http://"
                            addonAfter=".com"
                            placeholder="Please enter url"
                        />
                    </Form.Item>
                </Col>
            </Row>
            {/* Resto del formulario... */}
        </Form>
    );
};

const Park = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [drawerContent, setDrawerContent] = useState(null);
    const [buttonNumber, setButtonNumber] = useState(null);

    const showDrawer = (content, number) => {
        setDrawerContent(content);
        setButtonNumber(number);
        setOpenDrawer(true);
    };

    const onCloseDrawer = () => {
        setOpenDrawer(false);
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
                        <Button onClick={onCloseDrawer}>Cancel</Button>
                        <Button onClick={onCloseDrawer} type="primary">Submit</Button>
                    </Space>
                }
            >
                {drawerContent}
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
                                    <Button key={index} onClick={() => showDrawer(renderForm(), index + 6)}>{index + 6}</Button>
                                ))}
                            </div>
                            <div
                                style={{
                                    marginInlineStart: buttonWidth * -5,
                                }}
                            >
                                {[...Array(5)].map((_, index) => (
                                    <Button key={index} onClick={() => showDrawer(renderForm(), index + 1)}>{index + 1}</Button>
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

export default Park;
