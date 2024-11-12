import React, { useState, useEffect } from 'react';
import { Layout, Form } from 'antd';

import ParkingSpacesHeader from '../../../components/parkingSpace/ParkingSpacesHeader';
import ParkingSpacesLayout from '../../../components/parkingSpace/ParkingSpacesLayout';
import ParkingSpacesDrawer from '../../../components/parkingSpace/ParkingSpacesDrawer';
import ParkingSpacesStatistics from '../../../components/parkingSpace/ParkingSpacesStatistics';
import ParkingSpacesTimer from '../../../components/parkingSpace/ParkingSpacesTimer';
import ParkingSpacesButtons from '../../../components/parkingSpace/ParkingSpacesButtons';
import ParkingSpacesModal from '../../../components/parkingSpace/ParkingSpacesModal';

import '../../css/DashboardMenu.css';
import '../../css/ParkingSpaces.css';

const ParkingSpaces = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [buttonNumber, setButtonNumber] = useState(null);
  const [parkingSpaceStates, setParkingSpaceStates] = useState({});
  const [selectedParkingSpaceState, setSelectedParkingSpaceState] = useState(null);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedButtonId, setSelectedButtonId] = useState(null); 
  const [parkingSpaceDetails, setParkingSpaceDetails] = useState(null);
  const [form] = Form.useForm();

  const [parkingStatistics, setParkingStatistics] = useState({
    usagePercentage: 0,
    unusedPercentage: 0,
    freeSpaces: 0,
    occupiedSpaces: 0
  });

  const [parkingAverageTime, setParkingAverageTime] = useState({
    averageParkingTime: 0
  });

  const [totalCustomersToday, setTotalCustomersToday] = useState({
    totalCustomersToday: 0
  });

  const [timerRunning, setTimerRunning] = useState(false);
  const [timerValue, setTimerValue] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    fetchData();
    fetchParkingStatistics();
    fetchAverageParkingTime();
    fetchTotalCustomersToday();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking-space/state`); 
      const data = await response.json();
      const latestParkingSpaces = data.parkingSpaces;

      const parkingSpaceStatesCopy = {};
      latestParkingSpaces.forEach(space => {
        parkingSpaceStatesCopy[space.parking_space_id] = space.state;
      });

      setParkingSpaceStates(parkingSpaceStatesCopy);
    } catch (error) {
      console.error('Error al obtener los datos del estado de los espacios de parqueo:', error);
    }
  };

  const fetchParkingStatistics = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking-space/state`);
      const data = await response.json();
      const parkingSpaces = data.parkingSpaces;

      let occupiedCount = 0;
      let availableCount = 0;

      parkingSpaces.forEach(space => {
        if (space.state === 'Ocupado') {
          occupiedCount++;
        } else if (space.state === 'Disponible') {
          availableCount++;
        }
      });

      const totalSpaces = occupiedCount + availableCount;

      const usagePercentage = ((occupiedCount / totalSpaces) * 100).toFixed(2);
      const unusedPercentage = ((availableCount / totalSpaces) * 100).toFixed(2);

      setParkingStatistics({
        usagePercentage: isNaN(usagePercentage) ? 0 : usagePercentage,
        unusedPercentage: isNaN(unusedPercentage) ? 0 : unusedPercentage,
        freeSpaces: availableCount,
        occupiedSpaces: occupiedCount
      });
    } catch (error) {
      console.error('Error al obtener las estadísticas del parqueo:', error);
    }
  };    

  const fetchAverageParkingTime = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking-space/average-time`);
      const data = await response.json();

      const averageParkingTime = parseFloat(data.averageParkingTime);
      const formattedAverageParkingTime = averageParkingTime.toFixed(2);

      setParkingAverageTime(prevState => ({
        ...prevState,
        averageParkingTime: formattedAverageParkingTime
      }));
    } catch (error) {
      console.error('Error al obtener el tiempo promedio de estacionamiento:', error);
    }
  };

  const fetchTotalCustomersToday = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking-space/total-customers`);
      const data = await response.json();

      const totalCustomersToday = data.totalCustomersToday;
      setTotalCustomersToday(totalCustomersToday);

      setTotalCustomersToday(prevState => ({
        ...prevState,
        totalCustomersToday: data.totalCustomersToday
      }));
    } catch (error) {
      console.error('Error al obtener el total de clientes hoy:', error);
    }
  };

  const startTimer = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking-search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      
      if (!response.ok) {
        throw new Error('Error al iniciar el cronómetro');
      }

      setTimerRunning(true);
      setTimerInterval(setInterval(() => {
        setTimerValue(prevValue => prevValue + 1);
      }, 1000));
    } catch (error) {
      console.error('Error al iniciar el cronómetro:', error);
    }
  };

  const stopTimer = () => {
    setTimerRunning(false);
    clearInterval(timerInterval);
  };

  const resetTimer = async () => {
    try {
      const lastTimeResponse = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking-search/last-time`);
      const lastTimeData = await lastTimeResponse.json();
      const id = lastTimeData.data;

      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking-search/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      
      if (!response.ok) {
        throw new Error('Error al reiniciar el cronómetro');
      }

      stopTimer();
      setTimerValue(0);
    } catch (error) {
      console.error('Error al reiniciar el cronómetro:', error);
    }
  };

  const showDrawer = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking-space/${id}`);
      const data = await response.json();

      setButtonNumber(id);
      setSelectedParkingSpaceState(data.parkingSpace.state);
      
      setParkingSpaceStates(prevState => ({
        ...prevState,
        [id]: data.parkingSpace.state
      }));
      
      setOpenDrawer(true);
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      setSelectedParkingSpaceState(null);
      setOpenDrawer(true);
    }
  };
  
  const onCloseDrawer = () => {
    setOpenDrawer(false);
    form.resetFields(); 
    fetchData()
  };

  const handleParkingEntry = async () => {
    try {
      const values = await form.validateFields();
      const formData = {
        customerData: {
          firstname_owner: values.firstname_owner,
          lastname_owner: values.lastname_owner,
          phone_number: values.phone_number,
        },
        vehicleData: {
          license_plate: `${values.type_plate}-${values.license_plate}`,
          type: values.type,
          brand: values.brand,
          color: values.color,
        },
        parkingSpaceData: {
          state: 'Ocupado',
          parking_space_id: buttonNumber,
        },
      };

      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking-space`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        form.resetFields();
        onCloseDrawer();
        fetchData();
        fetchParkingStatistics(); 
        fetchTotalCustomersToday();
      } else {
        console.error('Error al guardar los datos:', data);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };   
  
  const editParkingSpaceState = async (id, newState) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking-space/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: newState }),
      });

      const data = await response.json();

      if (response.ok) {
        fetchData();
        fetchParkingStatistics(); 
        fetchAverageParkingTime();
      } else {
        console.error('Error al actualizar el estado del espacio de estacionamiento:', data);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };  

  const handleParkingSpaceClick = async (index) => {
    setSelectedButtonIndex(index);
    setSelectedButtonId(index); 

    if (parkingSpaceStates[index] === 'Ocupado') {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/parking-time/${index}`);
        const data = await response.json();

        setParkingSpaceDetails(data.id);

        setConfirmVisible(true); 
      } catch (error) {
        console.error('Error al obtener los detalles del espacio de parqueo:', error);
      }
    } else {
      showDrawer(index);
    }
  };

  const handleConfirm = () => {
    editParkingSpaceState(selectedButtonIndex, 'Disponible');
    setConfirmVisible(false); 
  };

  const handleCancel = () => {
    setConfirmVisible(false); 
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes > 0 ? minutes + 'min ' : ''}${seconds}s`;
  };

  const getButtonColor = (id) => {
    const spaceState = parkingSpaceStates[id];
    return spaceState === 'Ocupado' ? 'red' : 'green';
  };

  return (
    <Layout>
      <ParkingSpacesHeader />
      <ParkingSpacesLayout>
        <ParkingSpacesButtons 
          handleParkingSpaceClick={handleParkingSpaceClick} 
          getButtonColor={getButtonColor} 
        />
        <ParkingSpacesDrawer
          openDrawer={openDrawer}
          onCloseDrawer={onCloseDrawer}
          handleParkingEntry={handleParkingEntry}
          form={form}
          buttonNumber={buttonNumber}
          selectedParkingSpaceState={selectedParkingSpaceState}
        />
        <ParkingSpacesModal
          confirmVisible={confirmVisible}
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
          selectedButtonId={selectedButtonId}
          parkingSpaceDetails={parkingSpaceDetails}
        />
        <ParkingSpacesStatistics
          parkingStatistics={parkingStatistics}
          parkingAverageTime={parkingAverageTime}
          totalCustomersToday={totalCustomersToday}
        />
        <ParkingSpacesTimer
          timerValue={timerValue}
          timerRunning={timerRunning}
          startTimer={startTimer}
          resetTimer={resetTimer}
          formatTime={formatTime}
        />
      </ParkingSpacesLayout>
    </Layout>
  );
};

export default ParkingSpaces;