import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../context/AuthContext';
import styles from './PaymentPage.module.css';
import { FaCreditCard, FaLock } from 'react-icons/fa';

const PaymentPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/api/orders/${orderId}`);
        setOrder(data);
      } catch (error) {
        console.error("Failed to fetch order", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handlePayment = async () => {
    // In a real app, this would connect to a payment gateway like Stripe.
    // Here, we'll just confirm the order and redirect.
    alert('Payment successful! Your order is confirmed.');
    navigate('/my-orders');
  };

  if (loading) return <p>Loading payment details...</p>;
  if (!order) return <p>Could not find order.</p>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1>Confirm Your Payment</h1>
        <p className={styles.subtitle}>Review your order and complete the payment.</p>
        <div className={styles.paymentBox}>
          <div className={styles.summary}>
            <h3>Order Summary</h3>
            <div className={styles.lineItem}>
              <span>{order.fuelType.name} ({order.quantity} {order.fuelType.unit})</span>
              <span>₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.lineItem}>
              <span>Delivery Fee</span>
              <span>₹{order.deliveryFee.toFixed(2)}</span>
            </div>
            <div className={styles.lineItem}>
              <span>GST (18%)</span>
              <span>₹{order.gst.toFixed(2)}</span>
            </div>
            <div className={styles.total}>
              <span>Total Amount</span>
              <span>₹{order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className={styles.paymentMethod}>
            <h3><FaCreditCard /> Payment Method</h3>
            <p>This is a simulated payment. In a real app, a secure card entry form from a provider like Stripe would appear here.</p>
            <button onClick={handlePayment} className={styles.payButton}>
              <FaLock /> Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;