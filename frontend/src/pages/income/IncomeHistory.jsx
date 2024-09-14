import { useEffect, useState } from 'react';
import { Layout, Table, Tag, Typography, Button, Space, Modal, Form, Input, Drawer, message } from 'antd';
import { DeleteOutlined, SyncOutlined } from '@ant-design/icons';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';

import '../../css/DashboardMenu.css';
import '../../css/IncomeHistory.css';

const { Header } = Layout;
const { confirm } = Modal;

const IncomeHistory = () => {
    const [incomes, setIncomes] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedIncome, setSelectedIncome] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchIncomes = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/income`);
                if (response.ok) {
                    const data = await response.json();
                    setIncomes(data.data);
                } else {
                    console.error('Error getting incomes');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchIncomes();
    }, []);

    const getRandomColor = () => {
        const colors = ['blue', 'red', 'yellow', 'green', 'purple'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const handleDelete = (id) => {
        confirm({
            title: '¿Estás seguro de eliminar este ingreso monetario?',
            content: 'Esta acción no se puede deshacer.',
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                fetch(`${import.meta.env.VITE_APP_API_URL}/income/${id}`, {
                    method: 'DELETE',
                })
                .then(response => {
                    if (response.ok) {
                        const updatedIncomes = incomes.filter(income => income.id !== id);
                        setIncomes(updatedIncomes);
                        message.success('Ingreso eliminado exitosamente.');
                    } else {
                        console.error('Error to delete income');
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

    const handleUpdate = (income) => {
        setSelectedIncome(income);
        form.setFieldsValue({
            day: income.day,
            month: income.month,
            year: income.year,
            income: income.income,
            hour_date: income.hour_date,
        });
        setDrawerVisible(true);
    };

    const onFinish = async (values) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/income/${selectedIncome.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                const updatedIncome = await response.json();
                const updatedIncomes = incomes.map(income =>
                    income.id === updatedIncome.id ? updatedIncome : income
                );
                setIncomes(updatedIncomes);
                setDrawerVisible(false);
    
                const updatedResponse = await fetch(`${import.meta.env.VITE_APP_API_URL}/income`);

                message.success('Ingreso editado exitosamente.');
                if (updatedResponse.ok) {
                    const updatedData = await updatedResponse.json();
                    setIncomes(updatedData.data);
                } else {
                    console.error('Error getting updated incomes');
                }
            } else {
                console.error('Error updating income');
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
            title: 'Dia',
            dataIndex: 'day',
            key: 'day',
        },
        {
            title: 'Mes',
            dataIndex: 'month',
            key: 'month',
        },
        {
            title: 'Año',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Monto monetario',
            dataIndex: 'income',
            key: 'income',
        },
        {
            title: 'Feha y hora',
            dataIndex: 'hour_date',
            key: 'hour_date',
            render: (hour_date) => (
                <Tag color={getRandomColor()}>{hour_date}</Tag>
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
                <Layout.Content className='layout-content-income-history'>
                    <Typography.Title className='table-title-income-history' level={2}>
                        Historial de Ingresos
                    </Typography.Title>
                    <Table 
                        dataSource={incomes} 
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
                title="Editar historial de ingresos"
                width={500}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
            >
                <Form form={form} onFinish={onFinish}>
                    <Form.Item 
                        label="Día" 
                        name="day"
                        rules={[
                            {
                                required: true,
                                message: '¡Por favor ingresa el día del ingreso!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        label="Mes" 
                        name="month"
                        rules={[
                            {
                                required: true,
                                message: '¡Por favor ingresa el mes del ingreso!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        label="Año" 
                        name="year"
                        rules={[
                            {
                                required: true,
                                message: '¡Por favor ingresa el año del ingreso!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        label="Monto monetario" 
                        name="income"
                        rules={[
                            {
                                required: true,
                                message: '¡Por favor ingresa el monto del ingreso!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        label="Fecha y hora" 
                        name="hour_date"
                        rules={[
                            {
                                required: true,
                                message: '¡Por favor ingresa la fecha y hora del ingreso!',
                            },
                        ]}
                    >
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

export default IncomeHistory;