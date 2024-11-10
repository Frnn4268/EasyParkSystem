import React from 'react';
import { Menu, Typography } from 'antd';

const TopMenuCustomer = () => {
    return (
        <div style={{ position: 'fixed', width: '100%', zIndex: 1000 }}>
            <Menu theme='dark' mode="horizontal" style={{ display: 'flex' }} selectable={false}>
                <Menu.Item key='1' >
                    <Typography.Text 
                        style={{ 
                            fontFamily: 'Poppins, sans-serif', 
                            fontSize: 30, color: 'white', 
                            fontStyle: 'italic', 
                            fontWeight: 'bold', 
                            marginLeft: '-45px',
                            textShadow: '3px 3px 5px rgba(255, 255, 255, 1)',
                            WebkitTextStrokeWidth: '0.2px', 
                            WebkitTextStrokeColor: 'black' }}>
                        EasyPark
                    </Typography.Text>
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default TopMenuCustomer;
