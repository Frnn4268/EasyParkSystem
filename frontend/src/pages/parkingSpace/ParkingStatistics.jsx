import React, { useState, useEffect } from 'react';
import { Layout, Row, Col } from 'antd';

import ParkingStatisticsHeader from '../../../components/parkingStatistics/ParkingStatisticsHeader';
import ParkingStatisticsLayout from '../../../components/parkingStatistics/ParkingStatisticsLayout';
import ParkingStatisticsCard from '../../../components/parkingStatistics/ParkingStatisticsCard';
import ParkingStatisticsSummaryCard from '../../../components/parkingStatistics/ParkingStatisticsSummaryCard';

import '../../css/DashboardMenu.css';
import '../../css/ParkingStatistics.css';

const ParkingStatistics = () => {
  const [dailyCustomers, setDailyCustomers] = useState([]);
  const [dailyVehicles, setDailyVehicles] = useState([]);
  const [availableSpaces, setAvailableSpaces] = useState(0);
  const [occupiedSpaces, setOccupiedSpaces] = useState(0);
  const [usagePerSpace, setUsagePerSpace] = useState([]);
  const [totalDailyCustomers, setTotalDailyCustomers] = useState(0);
  const [averageParkingTime, setAverageParkingTime] = useState(0);
  const [longestParkingTime, setLongestParkingtime] = useState(0);
  const [averageParkingSearch, setAverageParkingSearch] = useState(0);

  useEffect(() => {
    fetchCustomerData();
    fetchVehicleData();
    fetchSpacesData();
    fetchUsagePerSpaceData();
    fetchTotalDailyCustomersData();
    fetchAverageParkingTimeData();
    fetchLongestParkingDurationOfMonth();
    fetchAverageParkingSearchData();
  }, []);

  const fetchCustomerData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking_space/total-customers-per-month`);
      const data = await response.json();
      setDailyCustomers(data);
    } catch (error) {
      console.error("Error fetching daily customer data:", error);
    }
  };

  const fetchVehicleData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking_space/total-vehicles-per-month`);
      const data = await response.json();
      setDailyVehicles(data);
    } catch (error) {
      console.error("Error fetching daily vehicle data:", error);
    }
  };

  const fetchSpacesData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking_space/total-state-spaces`);
      const data = await response.json();
      setAvailableSpaces(data.availableSpaces);
      setOccupiedSpaces(data.occupiedSpaces);
    } catch (error) {
      console.error("Error fetching parking spaces data:", error);
    }
  };

  const fetchUsagePerSpaceData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking_space/total-usage-per-space`);
      const data = await response.json();
      setUsagePerSpace(data);
    } catch (error) {
      console.error("Error fetching usage per space data:", error);
    }
  };

  const fetchTotalDailyCustomersData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking_space/total-daily-customers`);
      const data = await response.json();
      setTotalDailyCustomers(data.totalCustomers);
    } catch (error) {
      console.error("Error fetching total daily customers data:", error);
    }
  };

  const fetchAverageParkingTimeData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking_space/average-parking-time`);
      const data = await response.json();
      setAverageParkingTime(data.averageParkingTime);
    } catch (error) {
      console.error("Error fetching average parking time data:", error);
    }
  };

  const fetchLongestParkingDurationOfMonth = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking_space/longest-parking-duration-of-month`);
      const data = await response.json();
      setLongestParkingtime(data.longestParkingDuration);
    } catch (error) {
      console.error("Error fetching longest parking duration: ", error);
    }
  };

  const fetchAverageParkingSearchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking_space/average-time-search-parking`);
      const data = await response.json();
      setAverageParkingSearch(data.averageTimeInSeconds); 
    } catch (error) {
      console.error("Error fetching average parking search time data:", error);
    }
  };

  const formatDataForChart = (data, label) => {
    const labels = data.map(item => item._id);
    const counts = data.map(item => item[label]);
    return { labels, counts };
  };

  const customerChartData = formatDataForChart(dailyCustomers, 'totalCustomers');
  const vehicleChartData = formatDataForChart(dailyVehicles, 'totalVehicles');
  const usagePerSpaceChartData = formatDataForChart(usagePerSpace, 'usageCount');

  return (
    <Layout>
      <ParkingStatisticsHeader />
      <ParkingStatisticsLayout>
        <div style={{ marginTop: 40, marginLeft: 90 }}>
          <Row gutter={16} justify="space-around">
            <Col span={16}>
              <Row gutter={[16, 16]} justify="space-around">
                <Col span={12} style={{ marginBottom: 45 }}>
                  <ParkingStatisticsCard 
                    title="Clientes por Día del Mes" 
                    data={customerChartData.counts} 
                    color='#ffa500' 
                    xAxisData={customerChartData.labels} 
                  />
                </Col>
                <Col span={12} style={{ marginBottom: 0 }}>
                  <ParkingStatisticsCard 
                    title="Vehículos por Día del Mes" 
                    data={vehicleChartData.counts} 
                    color='#82ca9d' 
                    xAxisData={vehicleChartData.labels} 
                    style={{ marginLeft: 100 }}
                  />
                </Col>
                <Col span={12} style={{ marginBottom: 0 }}>
                  <ParkingStatisticsCard 
                    title="Espacios Disponibles y Ocupados" 
                    data={[availableSpaces, occupiedSpaces]} 
                    color={['#009846', '#ff7f0e']} 
                    xAxisData={['Espacios']} 
                  />
                </Col>
                <Col span={12} style={{ marginBottom: 0 }}>
                  <ParkingStatisticsCard 
                    title="Cantidad total de uso por espacio de parqueo" 
                    data={usagePerSpaceChartData.counts} 
                    color='#8884d8' 
                    xAxisData={usagePerSpaceChartData.labels} 
                    style={{ marginLeft: 100 }}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ParkingStatisticsSummaryCard 
                totalDailyCustomers={totalDailyCustomers} 
                averageParkingTime={averageParkingTime} 
                longestParkingTime={longestParkingTime} 
                averageParkingSearch={averageParkingSearch} 
              />
            </Col>
          </Row>
        </div>
      </ParkingStatisticsLayout>
    </Layout>
  );
}

export default ParkingStatistics;