import React, { useState } from 'react';
import { Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import { 
    CarOutlined,
    UsergroupAddOutlined ,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    HomeOutlined, 
    InfoCircleOutlined, 
    PhoneOutlined, 
    UserOutlined,
    AreaChartOutlined 
    } from '@ant-design/icons';

function getItem(label, key, icon, children, type, linkTo) {
    return {
      key,
      icon,
      children,
      label,
      type,
      linkTo,
    };
}

const items = [
    getItem('Inicio', '1', <HomeOutlined />, null, null, '/dashboard'),
    getItem('Parqueo', '2', <PieChartOutlined />, null, null, '/park'),
    getItem('Usuarios', '3', <UserOutlined />, null, null, '/users'),
    getItem('Clientes', 'sub2', <UsergroupAddOutlined  />, [
        getItem('Ver Clientes', '4', null, null, null, '/customers'),
        getItem('Clientes frecuentes', '5', null, null, null, '/usual-customers'), 
        null
    ]),
    getItem('Vehículos', 'sub1', <CarOutlined  />, [
        getItem('Ver Vehículos', '6', null, null, null, '/vehicles'),
        getItem('Historial de vehículos', '7', null, null, null, '/vehicles-history'), 
    ]),
    getItem('Ingresos', 'sub3', <AreaChartOutlined />, [
        getItem('Ver ingresos', '8', null, null, null, '/income'), 
        getItem('Ingresos diarios', '9', null, null, null, '/daily-income'), 
    ]),
    getItem('Información', '10', <InfoCircleOutlined />, null, null, '/about'),
    getItem('Contacto', '11', <PhoneOutlined />, null, null, '/contact')
];

const LeftMenu = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className='left-menu-div'>
            <Button
                type="primary"
                onClick={toggleCollapsed}
                style={{
                borderRadius: 0,
                }}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu 
                defaultSelectedKeys={['1']}
                defaultOpenKeys={items.map(item => item.key)}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                style={{}} 
                className='left-menu'
            >
                {items.map(item => (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.linkTo}>{item.label}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        </div>
    )
}

export default LeftMenu;
