import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import './App.css';

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
import ParkingSpace from './pages/parkingSpace/ParkingSpace.jsx';
import ParkingHistory from './pages/parkingSpace/ParkingHistory.jsx';
import ParkingStatistics from './pages/parkingSpace/ParkingStatistics.jsx';
import ParkingTime from './pages/parkingTime/ParkingTime.jsx';
import TimeParkingSearch from './pages/parkingSpace/TimeParkingSearch.jsx';

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

const ProtectedRoute = ({ element, isAuthenticated, isAdmin, adminOnly }) => {
  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }
  if (adminOnly && !isAdmin) {
    return <UserRoleError />;
  }
  return element;
};

const App = () => {
  const { isAuthenticated, userData } = useAuth();
  const isAdmin = isAuthenticated && userData?.role === 'Administrador';

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={!isAuthenticated ? <Home /> : <Navigate to='/dashboard' />}
        />
        <Route
          path='/register'
          element={
            !isAuthenticated ? <Register /> : <Navigate to='/dashboard' />
          }
        />
        <Route
          path='/login'
          element={!isAuthenticated ? <Login /> : <Navigate to='/dashboard' />}
        />
        <Route
          path='/parking-time/:id'
          element={<ParkingTime />}
        />
        <Route
          path='/dashboard'
          element={<ProtectedRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/park'
          element={<ProtectedRoute element={<ParkingSpace />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/parkhistory'
          element={<ProtectedRoute element={<ParkingHistory />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/time-parking'
          element={<ProtectedRoute element={<TimeParkingSearch />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/parkingstatistics'
          element={<ProtectedRoute element={<ParkingStatistics />} isAuthenticated={isAuthenticated} isAdmin={isAdmin} adminOnly />}
        />
        <Route
          path='/users'
          element={<ProtectedRoute element={<Users />} isAuthenticated={isAuthenticated} isAdmin={isAdmin} adminOnly />}
        />
        <Route
          path='/user-profile'
          element={<ProtectedRoute element={<UserProfile />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/customers'
          element={<ProtectedRoute element={<Customers />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/usual_customers'
          element={<ProtectedRoute element={<UsualCustomers />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/vehicles'
          element={<ProtectedRoute element={<Vehicles />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/vehicleshistory'
          element={<ProtectedRoute element={<VehiclesHistory />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/incomehistory'
          element={<ProtectedRoute element={<IncomeHistory />} isAuthenticated={isAuthenticated} isAdmin={isAdmin} adminOnly />}
        />
        <Route
          path='/incomestatistics'
          element={<ProtectedRoute element={<IncomeStatistics />} isAuthenticated={isAuthenticated} isAdmin={isAdmin} adminOnly />}
        />
        <Route
          path='/dailyincome'
          element={<ProtectedRoute element={<DailyIncome />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/module_contact'
          element={<ProtectedRoute element={<ContactComponent />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/module_about'
          element={<ProtectedRoute element={<InformationComponent />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/module_parking_price'
          element={<ProtectedRoute element={<ParkingPriceComponent />} isAuthenticated={isAuthenticated} isAdmin={isAdmin} adminOnly />}
        />
        <Route
          path='/error-page'
          element={<ProtectedRoute element={<UserRoleError />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/about'
          element={<Information />}
        />
        <Route
          path='/contact'
          element={<Contact />}
        />
        <Route
          path='*'
          element={<Navigate to='/login' />}
        />
      </Routes>
    </Router>
  );
};

export default App;