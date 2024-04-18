import React from 'react';
import { Layout, Space, Button, ConfigProvider } from 'antd';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DashboardMenu.css';

const { Header, Content } = Layout;

const buttonWidth = 80;

const Park = () => {

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
                                margin: 4,
                            },
                        }}
                    >
                        <div className="demo">
                            <div
                                style={{
                                    marginInlineStart: buttonWidth,
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {[...Array(15)].map((_, index) => (
                                    <Button key={index}>Botón {index + 1}</Button>
                                ))}
                            </div>
                            <div
                                style={{
                                    width: buttonWidth,
                                    marginInlineStart: buttonWidth * 4,
                                    float: 'left',
                                }}
                            >
                                {[...Array(5)].map((_, index) => (
                                    <Button key={index}>Botón {index + 1}</Button>
                                ))}
                            </div>
                        </div>
                    </ConfigProvider>
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

export default Park;
