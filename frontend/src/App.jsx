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
import Dashboard from './pages/Dashboard';

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
      </Routes>
    </Router>
  );
};

export default App;
