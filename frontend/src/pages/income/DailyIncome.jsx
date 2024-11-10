import React, { useState, useEffect } from 'react';
import { Layout, Card, Typography, message } from 'antd';
import moment from 'moment'; 

import IncomeHeader from '../../../components/dailyIncome/IncomeHeader';
import IncomeLayout from '../../../components/dailyIncome/IncomeLayout';
import IncomeForm from '../../../components/dailyIncome/IncomeForm';
import IncomeStatistics from '../../../components/dailyIncome/IncomeStatistics';

import '../../css/DailyIncome.css';

const { useForm } = Form;

const DailyIncome = () => {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [income, setIncome] = useState(0); 
  const [lastSavedIncome, setLastSavedIncome] = useState(0); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [lastDateIncome, setLastDateIncome] = useState(null); 

  const success = () => {
    messageApi
      .loading('Guardando ingreso...', 2.5)
      .then(() => {
        message.success('Ingreso guardado correctamente', 2.5);
        form.resetFields();
        setLastSavedIncome(income); 
      })
      .catch(() => message.error('Error al guardar el ingreso', 2.5));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const parseIncome = (value) => {
    const parsedValue = value.replace(/[^\d.]/g, '');
    return parseFloat(parsedValue).toFixed(2);
  };

  useEffect(() => {
    fetchLastIncome();
  }, []); 

  const fetchLastIncome = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/income/last-income`);
      const data = await response.json();
      if (data.status === 'success') {
        setIncome(data.data.income);
        setLastSavedIncome(data.data.income); 
        setLastDateIncome(moment(data.data.hour_date).format('YYYY-MM-DD HH:mm:ss')); 
      } else {
        throw new Error('Error al obtener el último ingreso');
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const { income } = values;

      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/income`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          day: selectedDate.date(),
          month: selectedDate.month() + 1,
          year: selectedDate.year(),
          income: parseFloat(income),
          hour_date: selectedDate.toISOString()
        }),
      });

      if (response.ok) {
        success();
      } else {
        throw new Error('Error al guardar el ingreso de dinero');
      }
    } catch (error) {
      message.error(error.message);
    }
  };      

  return (
    <Layout>
      <IncomeHeader />
      <IncomeLayout>
        <Card className="daily-income-block-section">
          <Typography.Title level={2} strong className='daily-income-title' style={{textAlign: 'center'}}>
            Ingreso Monetario
          </Typography.Title>
          <IncomeForm 
            form={form} 
            handleSubmit={handleSubmit} 
            handleDateChange={handleDateChange} 
            income={income} 
            setIncome={setIncome} 
            parseIncome={parseIncome} 
          />
        </Card>
        <IncomeStatistics 
          lastSavedIncome={lastSavedIncome} 
          lastDateIncome={lastDateIncome} 
        />
      </IncomeLayout>
      {contextHolder}
    </Layout>
  );
};

export default DailyIncome;