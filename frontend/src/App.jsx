import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import "./App.css";

// Home
import Home from './pages/home/Home.jsx'; 
import Information from './pages/home/Information.jsx'; 
import Contact from './pages/home/Contact.jsx'; 

// Auth
import Register from './auth/Register';
import Login from './auth/Login';
import { useAuth } from './contexts/AuthContext.jsx';

// Dashboard
import Dashboard from './pages/dashboard/Dashboard.jsx';

// Parking
import Park from './pages/park/Park.jsx';

// Users 
import Users from './pages/users/Users.jsx'

// Customers
import Customers from './pages/customer/Customers.jsx'
import UsualCustomers from './pages/customer/UsualCustomers.jsx'

// Vehicles
import Vehicles from './pages/vehicle/Vehicles.jsx'
import VehiclesHistory from './pages/vehicle/VehiclesHistory.jsx'

// Income
import Incomes from './pages/income/Incomes.jsx'
import DailyIncome from './pages/income/DailyIncome.jsx'

// Contact
import ModuleContact from './pages/contact/ModuleContact.jsx'

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
          element={isAuthenticated ? <Dashboard /> : <Login />}
        />
        <Route
          path="/park"
          element={
            isAuthenticated ? <Park /> :  <Login />
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
          path="/income"
          element={
            isAuthenticated ? <Incomes /> :  <Login />
          }
        />
        <Route
          path="/dailyincome"
          element={
            isAuthenticated ? <DailyIncome /> :  <Login />
          }
        />
        <Route
          path="/contact"
          element={
            isAuthenticated ? <ModuleContact /> :  <Login />
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
