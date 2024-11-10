import { useEffect, useState } from 'react';
import { Layout, Typography, message, Modal, Form } from 'antd';

import TopMenu from '../dashboard/TopMenu.jsx';
import LeftMenu from '../dashboard/LeftMenu.jsx';
import IncomeTable from '../../../components/incomeHistory/IncomeTable';
import IncomeDrawer from '../../../components/incomeHistory/IncomeDrawer';

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
          <IncomeTable 
            incomes={incomes} 
            handleUpdate={handleUpdate} 
            handleDelete={handleDelete} 
            getRandomColor={getRandomColor} 
          />
        </Layout.Content>
      </Layout>
      <IncomeDrawer
        drawerVisible={drawerVisible}
        setDrawerVisible={setDrawerVisible}
        form={form}
        onFinish={onFinish}
      />
    </Layout>
  );
};

export default IncomeHistory;