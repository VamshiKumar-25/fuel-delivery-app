import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../context/AuthContext';
import styles from './TrackOrderPage.module.css';
// NEW: Import icons for the timeline
import { FaSearch, FaClipboardCheck, FaCheckDouble, FaTruck, FaBoxOpen } from 'react-icons/fa';

// A sub-component to display the order status details and timeline
const OrderStatus = ({ order }) => {
  // Define the order of statuses and their corresponding icons
  const statuses = [
    { name: 'Pending', icon: <FaClipboardCheck /> },
    { name: 'Confirmed', icon: <FaCheckDouble /> },
    { name: 'Out for Delivery', icon: <FaTruck /> },
    { name: 'Delivered', icon: <FaBoxOpen /> },
  ];
  const currentStatusIndex = statuses.findIndex(s => s.name === order.status);

  return (
    <div className={styles.statusResult}>
      <div className={styles.statusHeader}>
        <h3>Order Status</h3>
        <p><strong>Order ID:</strong> {order.orderId}</p>
      </div>

      {/* Visual Timeline with Icons */}
      <div className={styles.timeline}>
        {statuses.map((status, index) => {
          const isCompleted = index < currentStatusIndex;
          const isActive = index === currentStatusIndex;
          
          let statusClass = styles.timelineStep;
          if (isCompleted) {
            statusClass += ` ${styles.completed}`;
          } else if (isActive) {
            statusClass += ` ${styles.active}`;
          }

          return (
            <div key={status.name} className={statusClass}>
              <div className={styles.timelineNode}>{status.icon}</div>
              {index < statuses.length - 1 && <div className={styles.timelineLine}></div>}
              <div className={styles.timelineContent}>
                <p>{status.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.statusDetails}>
        <p><strong>Fuel Type:</strong> {order.fuelType.name}</p>
        <p><strong>Delivery Address:</strong> {order.deliveryAddress.street}, {order.deliveryAddress.city}</p>
      </div>
    </div>
  );
};


const TrackOrderPage = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrackOrder = async (idToTrack) => {
    if (!idToTrack) return;
    setLoading(true);
    setError('');
    setOrder(null);

    try {
      let response;
      if (idToTrack.startsWith('ORD-')) {
        response = await api.get(`/api/orders/trackbyid/${idToTrack}`);
      } else {
        response = await api.get(`/api/orders/${idToTrack}`);
      }
      setOrder(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to find order.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const idFromUrl = searchParams.get('id');
    if (idFromUrl) {
      handleTrackOrder(idFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTrackOrder(orderId);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.titleSection}>
          <span className={styles.tag}><FaSearch /> Real-time tracking across Bengaluru</span>
          <h1>Track Your Fuel Order</h1>
          <p>Enter your order ID to track your fuel delivery status in real-time.</p>
        </div>

        <div className={styles.formCard}>
          <h2><FaSearch /> Order Tracking</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="orderId">Order ID</label>
            <input
              type="text"
              id="orderId"
              placeholder="e.g., ORD-000001"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Tracking...' : 'Track Order'}
            </button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
        </div>

        {order && <OrderStatus order={order} />}
      </div>
    </div>
  );
};

export default TrackOrderPage;