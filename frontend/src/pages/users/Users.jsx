import { useEffect, useState } from 'react';
import { Layout, Table, Tag, Typography, Button, Space, Modal, Form, Input, Switch, Drawer, Radio, message } from 'antd';
import { DeleteOutlined, SyncOutlined } from '@ant-design/icons';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DashboardMenu.css';
import '../../css/User.css';

const { Header } = Layout;
const { confirm } = Modal;

const Users = () => {
    const [users, setUsers] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null); 
    const [form] = Form.useForm();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_APP_API_URL_USER);
            if (response.ok) {
                const data = await response.json();
                setUsers(data.data);
            } else {
                console.error('Error getting users');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getRandomColor = () => {
        const colors = ['blue', 'red', 'yellow', 'green', 'purple'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const handleDelete = (id) => {
        confirm({
            title: '¿Estás seguro de eliminar este usuario?',
            content: 'Esta acción no se puede deshacer.',
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                fetch(`${import.meta.env.VITE_APP_API_URL_USER}/${id}`, {
                    method: 'DELETE',
                })
                    .then(response => {
                        if (response.ok) {
                            fetchUsers(); 
                            message.success('Usuario eliminado exitosamente.');
                        } else {
                            console.error('Error to delete contact');
                        }
                    })
                    .catch(error => {
                        console.error('Error processing request:', error);
                    });
            },
            onCancel() {
                console.log('Canceled');
            },
        });
    };

    const handleUpdate = (user) => {
        setSelectedUser(user);
        form.setFieldsValue({
            name: user.name,
            email: user.email,
            role: user.role,
            active: user.active
        });
        setSelectedRole(user.role); 
        setDrawerVisible(true);
    };

    const onFinish = async (values) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_USER}/${selectedUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                await fetchUsers(); 
                setDrawerVisible(false);
                message.success('Usuario editado exitosamente.');
            } else {
                console.error('Error updating user');
            }
        } catch (error) {
            console.error('Error processing request:', error);
        }
    };

    const handleSwitchChange = async (userId, checked) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_USER}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ active: checked }),
            });
            if (!response.ok) {
                console.error('Error updating user');
            } else {
                await fetchUsers(); 
            }
        } catch (error) {
            console.error('Error processing request:', error);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (email) => (
                <Tag color={getRandomColor()}>{email}</Tag>
            ),
        },
        {
            title: 'Rol',
            dataIndex: 'role',
            key: 'role',
            render: (role) => (
                <Tag color={role === 'Administrador' ? 'green' : 'blue'}>{role}</Tag>
            ),
        },
        {
            title: 'Estado',
            dataIndex: 'active',
            key: 'active',
            render: (active, record) => (
                <Switch
                    checked={active}
                    checkedChildren="Activo"
                    unCheckedChildren="Inactivo"
                    onChange={(checked) => handleSwitchChange(record.id, checked)}
                    style={{ backgroundColor: active ? 'green' : 'red', transition: 'background-color 0.3s' }} // Agregar una transición de color de fondo
                />
            ),
        },
        {
            title: 'Acción',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" icon={<SyncOutlined />} onClick={() => handleUpdate(record)}>Editar</Button>
                    <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>Eliminar</Button>
                </Space>
            ),
        },
    ];

    return (
        <Layout>
            <Header className='home-header-dashboard'>
                <TopMenu />
            </Header>
            <Layout>
                <Layout.Sider>
                    <LeftMenu />
                </Layout.Sider>
                <Layout.Content className='layout-content-user'>
                    <Typography.Title className='table-title-user' level={2}>
                        Usuarios
                    </Typography.Title>
                    <Table 
                        dataSource={users} 
                        columns={columns} 
                        rowKey="_id" 
                        pagination={{
                            pageSize: 10, 
                            showSizeChanger: false, 
                            pageSizeOptions: ['5', '10', '20'], 
                            showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} filas`,
                        }}
                    />
                </Layout.Content>
            </Layout>
            <Drawer
                title="Editar usuario"
                width={500}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
            >
                <Form form={form} onFinish={onFinish}>
                    <Form.Item label="Nombre" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Rol" name="role">
                        <Radio.Group onChange={(e) => setSelectedRole(e.target.value)}>
                            <Radio.Button value="Empleado">Empleado</Radio.Button>
                            <Radio.Button value="Administrador">Administrador</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ textAlign: 'center' }}>Guardar cambios</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </Layout>
    )
}

export default Users;
