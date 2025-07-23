import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Layout from './components/shared/Layout';

// Import Page Components
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage'; // NEW: Import this page
import CustomerDashboard from './pages/CustomerDashboard';
import OrderPage from './pages/OrderPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ServicesPage from './pages/ServicesPage';
import TrackOrderPage from './pages/TrackOrderPage';

// Import Admin Components
import AdminRoute from './components/shared/AdminRoute';
import AdminFuelManagement from './pages/AdminFuelManagement';
import AdminOrderManagement from './pages/AdminOrderManagement';

import './index.css';
import AboutUsPage from './pages/AboutUsPage';
import ProfilePage from './pages/ProfilePage';
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            
            {/* Public Routes */}
            <Route index element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="track-order" element={<TrackOrderPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password/:resettoken" element={<ResetPasswordPage />} /> {/* NEW: Add this route */}
            
            {/* Customer Routes */}
            <Route path="dashboard" element={<CustomerDashboard />} />
            <Route path="order/:fuelTypeId" element={<OrderPage />} />
            <Route path="my-orders" element={<OrderHistoryPage />} />
            <Route path="about" element={<AboutUsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="payment/:orderId" element={<PaymentPage />} />
            {/* Admin Routes */}
            <Route path="admin/fuels" element={<AdminRoute><AdminFuelManagement /></AdminRoute>} />
            <Route path="admin/orders" element={<AdminRoute><AdminOrderManagement /></AdminRoute>} />

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;