import { useEffect, useState } from 'react';
import { Layout, Table, Tag, Typography, Button, Space, Modal, Form, Input, Drawer, message } from 'antd';
import { DeleteOutlined, SyncOutlined } from '@ant-design/icons';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DashboardMenu.css'
import '../../css/Customer.css';

const { Header } = Layout;
const { confirm } = Modal;

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/customer`);
            if (response.ok) {
                const data = await response.json();
                setCustomers(data.data);
            } else {
                console.error('Error getting customers');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getRandomColor = () => {
        const colors = ['blue', 'red', 'yellow', 'green', 'purple', 'orange', 'gray'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const handleDelete = (id) => {
        confirm({
            title: '¿Estás seguro de eliminar este cliente?',
            content: 'Esta acción no se puede deshacer.',
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            async onOk() {
                try {
                    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/customer/${id}`, {
                        method: 'DELETE',
                    });
                    if (response.ok) {
                        await fetchCustomers();
                        message.success('Cliente eliminado exitosamente.');
                    } else if (response.status === 400) {
                        const data = await response.json();
                        message.warning(data.message);
                    } else {
                        console.error('Error to delete customer');
                    }
                } catch (error) {
                    console.error('Error processing request:', error);
                }
            },
            onCancel() {
                console.log('Canceled');
            },
        });
    };

    const handleUpdate = (customer) => {
        setSelectedCustomer(customer);
        form.setFieldsValue({
            firstname_owner: customer.firstname_owner,
            lastname_owner: customer.lastname_owner,
            phone_number: customer.phone_number,
        });
        setDrawerVisible(true);
    };

    const onFinish = async (values) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/customer/${selectedCustomer.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                await fetchCustomers(); 
                setDrawerVisible(false);
                message.success('Cliente editado exitosamente.');
            } else {
                console.error('Error updating customer');
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
            dataIndex: 'firstname_owner',
            key: 'firstname_owner',
        },
        {
            title: 'Apellido',
            dataIndex: 'lastname_owner',
            key: 'lastname_owner',
        },
        {
            title: 'Número de teléfono',
            dataIndex: 'phone_number',
            key: 'phone_number',
            render: (phone_number) => (
                <Tag color={getRandomColor()}>{phone_number}</Tag>
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
                <Layout.Content className='layout-content-customer'>
                    <Typography.Title className='table-title-customer' level={2}>
                        Clientes
                    </Typography.Title>
                    <Table 
                        dataSource={customers} 
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
                title="Editar cliente"
                width={500}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
            >
                <Form form={form} onFinish={onFinish}>
                    <Form.Item label="Nombre" name="firstname_owner">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Apellido" name="lastname_owner">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Número de teléfono" name="phone_number">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ textAlign: 'center' }}>Guardar cambios</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </Layout>
    )
}

export default Customers;