import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Layout, Spin } from 'antd';

import ParkingTimeCard from '../../../components/parkingTime/ParkingTimeCard';
import ParkingTimePopover from '../../../components/parkingTime/ParkingTimePopover';
import ParkingTimeHeader from '../../../components/parkingTime/ParkingTimeHeader';

import '../../css/ParkingTimeCustomer.css';

const { Footer } = Layout;

const ParkingTime = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [parkingCost, setParkingCost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [popoverVisible, setPopoverVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/parking-time-customer/customer/${id}`);
        setData(response.data);

        setLoading(false);

        const entryTime = new Date(response.data.hour_date_entry).getTime();
        const currentTime = new Date().getTime();
        const elapsed = Math.floor((currentTime - entryTime) / 1000); 
        setElapsedTime(elapsed);
        
        const intervalId = setInterval(async () => {
          const currentTime = new Date().getTime();
          const elapsed = Math.floor((currentTime - entryTime) / 1000);
          setElapsedTime(elapsed);

          if (elapsed % 900 === 0) {
            const costResponse = await axios.get(`${import.meta.env.VITE_APP_API_URL}/parking-price/${id}`);
            setParkingCost(costResponse.data);
          }
        }, 1000);

        const costResponse = await axios.get(`${import.meta.env.VITE_APP_API_URL}/parking-price/${id}`);
        setParkingCost(costResponse.data);

        return () => clearInterval(intervalId);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const formatEntryTime = (entryTime) => {
    const date = new Date(entryTime);
    const formattedDate = date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = date.toLocaleTimeString('es-ES');
    return `${formattedDate} a las ${formattedTime}`;
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours} hrs ${minutes} min ${remainingSeconds} seg`;
    } else if (minutes > 0) {
      return `${minutes} min ${remainingSeconds} seg`;
    } else {
      return `${remainingSeconds} seg`;
    }
  };

  const handlePopoverVisibleChange = (visible) => {
    setPopoverVisible(visible);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container">
      <Layout>
        <ParkingTimeHeader />
        <Layout.Content>
          <div className="card-wrapper">
            <ParkingTimeCard 
              data={data} 
              elapsedTime={elapsedTime} 
              parkingCost={parkingCost} 
              formatEntryTime={formatEntryTime} 
              formatTime={formatTime} 
            />
          </div>
          <ParkingTimePopover 
            popoverVisible={popoverVisible} 
            handlePopoverVisibleChange={handlePopoverVisibleChange} 
          />
        </Layout.Content>
        <Footer className="footer">
          Restaurante y Pastelería Florencia - 2024 ©EasyPark
        </Footer>
      </Layout>
    </div>
  );
};

export default ParkingTime;