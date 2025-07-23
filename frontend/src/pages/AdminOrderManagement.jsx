import React, { useState, useEffect } from 'react';
import api from '../context/AuthContext';
import Header from '../components/shared/Header';
import Modal from '../components/shared/Modal';
import OrderStatusTracker from '../components/shared/OrderStatusTracker';
import styles from './AdminOrderManagement.module.css';

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for the modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/api/orders');
      setOrders(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch orders', error);
      setError('Failed to fetch orders.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/api/orders/${orderId}/status`, { status: newStatus });
      // Update status in the main list and the selected order in the modal
      setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      setSelectedOrder(prev => (prev && prev._id === orderId ? { ...prev, status: newStatus } : prev));
    } catch (error) {
      console.error('Failed to update status', error);
      alert('Failed to update status.');
    }
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };
  
  const getStatusClass = (status) => {
    return styles[`status${status.replace(/\s+/g, '')}`] || styles.statusGray;
  };

  return (
    <div className={styles.pageBackground}>
      <main className={styles.mainContainer}>
        <h1>Order Management</h1>
        {loading ? <p>Loading orders...</p> : error ? <p className={styles.error}>{error}</p> : (
          <div className={styles.tableContainer}>
            <table className={styles.ordersTable}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.orderId}</td>
                    <td>{order.customer?.fullName || 'N/A'}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>₹{order.totalPrice.toFixed(2)}</td>
                    <td>
                      <span className={`${styles.status} ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => openOrderDetails(order)} className={styles.detailsButton}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedOrder && (
          <div className={styles.modalContent}>
            <h2>Order Details ({selectedOrder.orderId})</h2>
            <OrderStatusTracker status={selectedOrder.status} />
            <div className={styles.modalDetails}>
              <div>
                <p><strong>Customer:</strong> {selectedOrder.customer?.fullName}</p>
                <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p><strong>Total:</strong> ₹{selectedOrder.totalPrice.toFixed(2)}</p>
                <p><strong>Address:</strong> {selectedOrder.deliveryAddress.street}, {selectedOrder.deliveryAddress.area}</p>
              </div>
            </div>
            <div className={styles.modalActions}>
              <label htmlFor="status-update">Update Status:</label>
              <select
                id="status-update"
                className={styles.statusSelect}
                value={selectedOrder.status}
                onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminOrderManagement;