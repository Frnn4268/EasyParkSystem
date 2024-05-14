import { useEffect, useState } from 'react';
import { Layout, Table, Tag, Typography, Button, Space, Modal, Form, Input, Drawer, message } from 'antd';
import { DeleteOutlined, SyncOutlined } from '@ant-design/icons';

import TopMenu from '../src/pages/dashboard/TopMenu.jsx';
import LeftMenu from '../src/pages/dashboard/LeftMenu.jsx';

import '../src/css/DashboardMenu.css';
import '../src/css/ContactComponent.css';

const { Header } = Layout;
const { confirm } = Modal;

const ContactComponent = () => {
    const [contacts, setContacts] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
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
                    console.error('Error getting contacts');
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
                fetch(`${import.meta.env.VITE_APP_API_URL_CONTACT}/${id}`, {
                    method: 'DELETE',
                })
                .then(response => {
                    if (response.ok) {
                        const updatedContacts = contacts.filter(contact => contact.id !== id);
                        setContacts(updatedContacts);
                        message.success('Contacto eliminado exitosamente.');
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

    const handleUpdate = (contact) => {
        setSelectedContact(contact);
        form.setFieldsValue({
            name: contact.name,
            email: contact.email,
            message: contact.message,
        });
        setDrawerVisible(true);
    };

    const onFinish = async (values) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL_CONTACT}/${selectedContact.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                const updatedContact = await response.json();
                const updatedContacts = contacts.map(contact =>
                    contact.id === updatedContact.id ? updatedContact : contact
                );
                setContacts(updatedContacts);
                setDrawerVisible(false);
    
                const updatedResponse = await fetch(import.meta.env.VITE_APP_API_URL_CONTACT);
                if (updatedResponse.ok) {
                    const updatedData = await updatedResponse.json();
                    setContacts(updatedData.data);
                } else {
                    console.error('Error getting updated contacts');
                }
            } else {
                console.error('Error updating contact');
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
            title: 'Mensaje',
            dataIndex: 'message',
            key: 'message',
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
                <Layout.Content className='layout-content-contact'>
                    <Typography.Title className='table-title-contact' level={2}>
                        Contacto
                    </Typography.Title>
                    <Table 
                        dataSource={contacts} 
                        columns={columns} 
                        rowKey="_id" 
                        pagination={{
                            pageSize: 9, 
                            showSizeChanger: false, 
                            pageSizeOptions: ['5', '10', '20'], 
                            showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} filas`,
                        }}
                    />
                </Layout.Content>
            </Layout>
            <Drawer
                title="Editar contacto"
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
                    <Form.Item label="Mensaje" name="message">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ textAlign: 'center' }}>Guardar cambios</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </Layout>
    );
};

export default ContactComponent;
