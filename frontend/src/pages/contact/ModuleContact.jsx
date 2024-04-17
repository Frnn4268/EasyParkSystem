import { useEffect, useState } from 'react';
import { Layout, Table, Tag, Typography, Button, Space, Modal, Form, Input } from 'antd';
import { DeleteOutlined, SyncOutlined  } from '@ant-design/icons';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DashboardMenu.css';
import '../../css/ModuleContact.css';

const { Header } = Layout;
const { confirm } = Modal;

const ModuleContact = () => {
    const [contacts, setContacts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_APP_API_URL_CONTACT);
                if (response.ok) {
                    const data = await response.json();
                    setContacts(data.data);
                } else {
                    console.error('Error al obtener los contactos');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchContacts();
    }, []);

    const getRandomColor = () => {
        const colors = ['blue', 'red', 'yellow', 'green', 'purple'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const handleDelete = (id) => {
        confirm({
            title: '¿Estás seguro de eliminar este contacto?',
            content: 'Esta acción no se puede deshacer.',
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                // Lógica para eliminar el contacto
                const updatedContacts = contacts.filter(contact => contact.id !== id);
                setContacts(updatedContacts);
            },
            onCancel() {
                console.log('Cancelado');
            },
        });
    };

    const handleUpdate = (contact) => {
        setSelectedContact(contact);
        setModalVisible(true);
        form.setFieldsValue({
            name: contact.name,
            email: contact.email,
            message: contact.message,
        });
    };

    const onFinish = (values) => {
        const updatedContacts = contacts.map(contact => {
            if (contact.id === selectedContact.id) {
                return { ...contact, ...values };
            }
            return contact;
        });
        setContacts(updatedContacts);
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
            title: 'Mensaje',
            dataIndex: 'message',
            key: 'message',
        },
        {
            title: 'Acción',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" icon={<SyncOutlined />} onClick={() => handleUpdate(record)}>Actualizar</Button>
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
                <Layout.Content className='layout-content-contact'>
                    <Typography.Title className='table-title-contact'>
                        Contacto
                    </Typography.Title>
                    <Table dataSource={contacts} columns={columns} rowKey="_id" />
                </Layout.Content>
            </Layout>
            <Modal
                title="Actualizar contacto"
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
                    <Form.Item label="Mensaje" name="message">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ textAlign: 'center' }}>Guardar cambios</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default ModuleContact;
