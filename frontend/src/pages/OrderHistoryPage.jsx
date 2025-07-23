import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import styles from './OrderHistoryPage.module.css';

const OrderHistoryPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/api/orders/myorders');
        // Sort orders to show the newest first
        setOrders(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (error) {
        console.error("Failed to fetch orders", error);
        setError('Could not load your orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchOrders();
    }
  }, [user]); // Re-fetch orders if the user changes

  // Helper function to get the correct CSS class for the status badge
  const getStatusClass = (status) => {
    // Removes spaces from status to match CSS class names (e.g., "Out for Delivery" -> "OutforDelivery")
    return styles[`status${status.replace(/\s+/g, '')}`] || styles.statusGray;
  };

  return (
    <div className={styles.pageBackground}>
      <main className={styles.mainContainer}>
        <h1>My Order History</h1>
        {loading ? (
          <p>Loading your orders...</p>
        ) : error ? (
          <p style={{color: 'red'}}>{error}</p>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.ordersTable}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Fuel Type</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map(order => (
                    <tr key={order._id}>
                      <td>
                        {/* The text now shows the new custom orderId */}
                        {/* The link still uses the unique database _id for tracking */}
                        <Link to={`/track-order?id=${order._id}`} className={styles.orderIdLink}>
                          {order.orderId}
                        </Link>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>{order.fuelType ? order.fuelType.name : 'N/A'}</td>
                      <td>₹{order.totalPrice.toFixed(2)}</td>
                      <td>
                        <span className={`${styles.status} ${getStatusClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>You have no orders yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default OrderHistoryPage;