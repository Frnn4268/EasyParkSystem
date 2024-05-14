import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Avatar, Button, Popover, Typography, Divider } from 'antd';
import { UserOutlined, LogoutOutlined, EditOutlined } from '@ant-design/icons';

import { useAuth } from '../../contexts/AuthContext.jsx';

import '../../css/DashboardMenu.css'

import icon_1 from '../../assets/icons/icon_1.png';
import icon_2 from '../../assets/icons/icon_2.png';
import icon_3 from '../../assets/icons/icon_3.png';
import icon_4 from '../../assets/icons/icon_4.png';
import icon_5 from '../../assets/icons/icon_5.png';

const TopMenu = () => {
    const { logout, userData } = useAuth();

    const avatarImages = [icon_1, icon_2, icon_3, icon_4, icon_5];

    const randomAvatarIndex = Math.floor(Math.random() * avatarImages.length);
    const avatarSrc = avatarImages[randomAvatarIndex];

    const handleLogout = async () => {
        await logout();
    };

    const popoverContent = (
        <div>
            <p><strong>Rol:</strong> {userData && userData.role}</p>
            <p><strong>Correo:</strong> {userData && userData.email}</p>
            <Link to="/user-profile">
                <Button type="link" icon={<EditOutlined />} style={{ marginLeft: 45 }}>
                    Editar perfil
                </Button>
            </Link>
        </div>
    );

    return (
        <div style={{ position: 'fixed', width: '100%', zIndex: 1000 }}>
            <Menu theme='dark' mode="horizontal" style={{ display: 'flex' }} selectable={false}>
                <Menu.Item key='1' >
                    <Typography.Text className='top-nav-text'>EasyPark</Typography.Text>
                </Menu.Item>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                        <div>
                            <Popover content={popoverContent}>
                                <Avatar src={avatarSrc} icon={<UserOutlined />} />
                                <Typography.Text className='top-nav-username'>{userData && userData.name}</Typography.Text>
                            </Popover>
                        </div>
                    <Divider type="vertical" className="top-menu-divider" />
                    <Button icon={<LogoutOutlined />} size="large" type="primary" className="profile-btn" onClick={handleLogout}>
                        Cerrar sesión
                    </Button>
                </div>
            </Menu>
        </div>
    );
};

export default TopMenu;
