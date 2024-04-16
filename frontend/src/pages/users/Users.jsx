import { useEffect, useState } from 'react';
import { Layout, Table, Tag, Typography, Button, Space, Modal, Form, Input, Switch  } from 'antd';
import { DeleteOutlined, SyncOutlined } from '@ant-design/icons';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DashboardMenu.css';
import '../../css/User.css';

const { Header } = Layout;
const { confirm } = Modal;

const Users = () => {
    const [users, setUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_APP_API_URL_USER);
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data.data);
                } else {
                    console.error('Error al obtener los usuarios');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);

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
                const updatedUsers = users.filter(user => user.id !== id);
                setUsers(updatedUsers);
            },
            onCancel() {
                console.log('Cancelado');
            },
        });
    };

    const handleUpdate = (user) => {
        setSelectedUser(user);
        setModalVisible(true);
        form.setFieldsValue({
            name: user.name,
            email: user.email,
            role: user.role,
            active: user.active
        });
    };

    const onFinish = (values) => {
        const updatedUsers = users.map(user => {
            if (user.id === selectedUser.id) {
                return { ...user, ...values };
            }
            return user;
        });
        setUsers(updatedUsers);
        setModalVisible(false);
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
            render: (active) => (
                <Switch
                    checkedChildren="Activo"
                    unCheckedChildren="Inactivo"
                    defaultChecked={active}
                    style={{ backgroundColor: active ? 'green' : 'red' }}
                />
            ),
        },
        {
            title: 'Acción',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" icon={<SyncOutlined />} onClick={() => handleUpdate(record)}>Actualizar</Button>
                    <Button type="secondary" icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>Eliminar</Button>
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
                    <Typography.Title className='table-title-user'>
                        Usuarios
                    </Typography.Title>
                    <Table dataSource={users} columns={columns} rowKey="_id" />
                </Layout.Content>
            </Layout>
            <Modal
                title="Actualizar usuario"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={onFinish}>
                    <Form.Item label="Nombre" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Rol" name="role">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Estado" name="active">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ textAlign: 'center' }}>Guardar cambios</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    )
}

export default Users;
