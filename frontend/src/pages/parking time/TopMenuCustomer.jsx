import React from 'react';
import { Menu, Typography } from 'antd';

const TopMenuCustomer = () => {
    return (
        <div style={{ position: 'fixed', width: '100%', zIndex: 1000 }}>
            <Menu theme='dark' mode="horizontal" style={{ display: 'flex' }} selectable={false}>
                <Menu.Item key='1' >
                    <Typography.Text className='top-nav-text' >EasyPark</Typography.Text>
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default TopMenuCustomer;
