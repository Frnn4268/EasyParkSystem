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

// Parking
import ParkingSpace from './pages/parking space/ParkingSpace.jsx';
import ParkingHistory from './pages/parking space/ParkingHistory.jsx'

// Users 
import Users from './pages/users/Users.jsx'

// Customers
import Customers from './pages/customer/Customers.jsx'
import UsualCustomers from './pages/customer/UsualCustomers.jsx'

// Vehicles
import Vehicles from './pages/vehicle/Vehicles.jsx'
import VehiclesHistory from './pages/vehicle/VehiclesHistory.jsx'

// Income
import IncomeHistory from './pages/income/IncomeHistory.jsx'
import DailyIncome from './pages/income/DailyIncome.jsx'
import Statistics from './pages/income/Statistics.jsx';

// Components
import ContactComponent from './../components/ContactComponent.jsx'
import InformationComponent from './../components/InformationComponent.jsx'

const App = () => {
  const { isAuthenticated } = useAuth();

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
          path="/users"
          element={
            isAuthenticated ? <Users /> :  <Login />
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
            isAuthenticated ? <IncomeHistory /> :  <Login />
          }
        />
        <Route
          path="/statistics"
          element={
            isAuthenticated ? <Statistics /> :  <Login />
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
