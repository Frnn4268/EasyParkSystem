import React, { useState } from 'react';
import { Menu, Avatar, Button, Popover, Typography, Input, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
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

    const [visible, setVisible] = useState(false);

    const handlePopoverVisibleChange = (visible) => {
        setVisible(visible);
    };

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div style={{ position: 'fixed', width: '100%', zIndex: 1000 }}>
            <Menu theme='dark' mode="horizontal" style={{ display: 'flex' }}>
                <Menu.Item key='1' >
                    <Typography.Text className='top-nav-text'>Easy Park</Typography.Text>
                </Menu.Item>
                <Menu.Item key="2" style={{ marginLeft: 'auto' }}>
                    <Popover
                        content={
                            <div>
                                <Typography.Text>Email: {userData && userData.email}</Typography.Text>
                                <br />
                                <Typography.Text>Rol: {userData && userData.role}</Typography.Text>
                            </div>
                        }
                        title='Usuario'
                        trigger="hover"
                        visible={visible}
                        onVisibleChange={handlePopoverVisibleChange}
                    >
                        <Avatar src={avatarSrc} icon={<UserOutlined />} />
                        <Typography.Text className='top-nav-username'>{userData && userData.name}</Typography.Text>
                    </Popover>
                </Menu.Item>
                <Menu.Item key='3'>
                    <Button size="large" type="primary" className="profile-btn" onClick={handleLogout}>
                        Cerrar sesión
                    </Button>
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default TopMenu;
