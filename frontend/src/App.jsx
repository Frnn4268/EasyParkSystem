import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import "./App.css";

// Home
import Home from './pages/home/Home.jsx'; 
import Information from './pages/home/Information.jsx'; 
import Contact from './pages/home/Contact.jsx'; 

// Auth
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import { useAuth } from './contexts/AuthContext.jsx';

// Dashboard
import Dashboard from './pages/dashboard/Dashboard.jsx';
import ContactComponent from './pages/dashboard/ContactComponent.jsx';
import InformationComponent from './pages/dashboard/InformationComponent.jsx';

// Parking
import ParkingSpace from './pages/parking space/ParkingSpace.jsx';
import ParkingHistory from './pages/parking space/ParkingHistory.jsx';
import ParkingStatistics from './pages/parking space/ParkingStatistics.jsx';
import ParkingTime from './pages/parking time/ParkingTime.jsx';
import TimeParkingSearch from './pages/parking space/TimeParkingSearch.jsx';

// Users 
import Users from './pages/users/Users.jsx';
import UserProfile from './pages/users/UserProfile.jsx';

// Customers
import Customers from './pages/customer/Customers.jsx';
import UsualCustomers from './pages/customer/UsualCustomers.jsx';

// Vehicles
import Vehicles from './pages/vehicle/Vehicles.jsx';
import VehiclesHistory from './pages/vehicle/VehiclesHistory.jsx';

// Income
import IncomeHistory from './pages/income/IncomeHistory.jsx';
import DailyIncome from './pages/income/DailyIncome.jsx';
import IncomeStatistics from './pages/income/IncomeStatistics.jsx';
import ParkingPriceComponent from './pages/income/ParkingPriceComponent.jsx';

// User role error
import UserRoleError from './pages/error/UserRoleError.jsx';

const App = () => {
  const { isAuthenticated, userData } = useAuth();
  const isAdmin = isAuthenticated && userData?.role === 'Administrador';

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? <Home /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? <Register /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/parking-time/:id"
          element={
            !isAuthenticated ? <ParkingTime /> : <Navigate to="/parking-time/:id" />
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Login />}
        />
        <Route
          path="/park"
          element={
            isAuthenticated ? <ParkingSpace /> :  <Login />
          }
        />
        <Route
          path="/parkhistory"
          element={
            isAuthenticated ? <ParkingHistory /> :  <Login />
          }
        />
        <Route
          path="/time-parking"
          element={
            isAuthenticated ? <TimeParkingSearch /> :  <Login />
          }
        />
        <Route
          path="/parkingstatistics"
          element={
            isAuthenticated ? (
              isAdmin ? <ParkingStatistics /> : <UserRoleError />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/users"
          element={
            isAuthenticated ? (
              isAdmin ? <Users /> : <UserRoleError />
            )  :  (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/user-profile"
          element={
            isAuthenticated ? <UserProfile /> :  <Login />
          }
        />
        <Route
          path="/customers"
          element={
            isAuthenticated ? <Customers /> :  <Login />
          }
        />
        <Route
          path="/usual_customers"
          element={
            isAuthenticated ? <UsualCustomers /> :  <Login />
          }
        />
        <Route
          path="/vehicles"
          element={
            isAuthenticated ? <Vehicles /> :  <Login />
          }
        />
        <Route
          path="/vehicleshistory"
          element={
            isAuthenticated ? <VehiclesHistory /> :  <Login />
          }
        />
        <Route
          path="/incomehistory"
          element={
            isAuthenticated ? (
              isAdmin ? <IncomeHistory /> : <UserRoleError />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/incomestatistics"
          element={
            isAuthenticated ? (
              isAdmin ? <IncomeStatistics /> :  <UserRoleError />
            ) : (
              <Navigate to="/login" />
            ) 
          }
        />
        <Route
          path="/dailyincome"
          element={
            isAuthenticated ? <DailyIncome /> :  <Login />
          }
        />
        <Route
          path="/module_contact"
          element={
            isAuthenticated ? <ContactComponent /> :  <Login />
          }
        />
        <Route
          path="/module_about"
          element={
            isAuthenticated ? <InformationComponent /> :  <Login />
          }
        />
        <Route
          path="/module_parking_price"
          element={
            isAuthenticated ? (
              isAdmin ? <ParkingPriceComponent /> :  <UserRoleError />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/error-page"
          element={
            isAuthenticated ? <UserRoleError /> :  <Login />
          }
        />
        <Route
          path="/about"
          element={
            !isAuthenticated ? <Information /> : <Navigate to="/about" />
          }
        />
        <Route
          path="/contact"
          element={
            !isAuthenticated ? <Contact /> : <Navigate to="/contact" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
