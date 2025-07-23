import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../context/AuthContext';
import styles from './OrderPage.module.css';
import { FaGasPump, FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';

const OrderPage = () => {
  const { fuelTypeId } = useParams();
  const navigate = useNavigate();

  const [fuelType, setFuelType] = useState(null);
  const [quantity, setQuantity] = useState(15);
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    area: '',
    zip: '',
    city: 'Bengaluru',
  });
  const [deliveryDate, setDeliveryDate] = useState(new Date().toISOString().split('T')[0]);
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('Morning (8AM - 12PM)');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  const [priceDetails, setPriceDetails] = useState({
    subtotal: 0,
    deliveryFee: 250.00,
    gst: 0,
    totalPrice: 0,
  });
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFuelType = async () => {
      try {
        const { data } = await api.get(`/api/fueltypes/${fuelTypeId}`);
        setFuelType(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load fuel details.');
      } finally {
        setLoading(false);
      }
    };
    fetchFuelType();
  }, [fuelTypeId]);

  useEffect(() => {
    if (fuelType) {
      const subtotal = quantity * fuelType.pricePerUnit;
      const gst = (subtotal + priceDetails.deliveryFee) * 0.18;
      const totalPrice = subtotal + priceDetails.deliveryFee + gst;
      setPriceDetails(prev => ({ ...prev, subtotal, gst, totalPrice }));
    }
  }, [quantity, fuelType, priceDetails.deliveryFee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const orderDetails = {
      fuelTypeId,
      quantity,
      deliveryAddress,
      deliveryDate,
      deliveryTimeSlot,
      specialInstructions,
      ...priceDetails,
    };

    try {
      // The backend returns the newly created order
      const { data: createdOrder } = await api.post('/api/orders', orderDetails);
      
      // Navigate to the payment page with the new order's ID
      navigate(`/payment/${createdOrder._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className={styles.pageBackground}>
        <header style={{padding: '1rem 2rem', backgroundColor: 'var(--card-background)', borderBottom: '1px solid var(--border-color)'}}>
            <Link to="/dashboard" style={{textDecoration: 'none', fontWeight: '600', color: 'var(--text-primary)'}}>&larr; Back to Dashboard</Link>
        </header>
        <p style={{textAlign: 'center', padding: '2rem'}}>Loading...</p>
    </div>
  );
  if (!fuelType) return <p>Fuel type not found.</p>;

  return (
    <div className={styles.pageBackground}>
      <header style={{padding: '1rem 2rem', backgroundColor: 'var(--card-background)', borderBottom: '1px solid var(--border-color)'}}>
        <Link to="/dashboard" style={{textDecoration: 'none', fontWeight: '600', color: 'var(--text-primary)'}}>&larr; Back to Dashboard</Link>
      </header>
      
      <main className={styles.mainContainer}>
        <div className={styles.formWrapper}>
          <h1 style={{fontSize: '1.875rem', fontWeight: '600', textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-primary)'}}>Place Your Fuel Order</h1>
          {error && <p className={styles.errorBanner}>{error}</p>}
          <form onSubmit={handleSubmit} id="order-form">
            <section className={styles.formSection}>
              <h2 className={styles.sectionHeader}><FaGasPump /> Fuel Selection</h2>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Fuel Type</label>
                  <input type="text" value={fuelType.name} readOnly />
                </div>
                <div className={styles.formGroup}>
                  <label>Quantity ({fuelType.unit})</label>
                  <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} min="1" required />
                </div>
              </div>
            </section>
            
            <section className={styles.formSection}>
              <h2 className={styles.sectionHeader}><FaMapMarkerAlt /> Delivery Address</h2>
              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Street Address</label>
                  <input type="text" placeholder="e.g., 123, Koramangala 4th Block" value={deliveryAddress.street} onChange={e => setDeliveryAddress({...deliveryAddress, street: e.target.value})} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Area</label>
                  <input type="text" placeholder="e.g., Koramangala" value={deliveryAddress.area} onChange={e => setDeliveryAddress({...deliveryAddress, area: e.target.value})} required />
                </div>
                <div className={styles.formGroup}>
                  <label>PIN Code</label>
                  <input type="text" placeholder="e.g., 560034" value={deliveryAddress.zip} onChange={e => setDeliveryAddress({...deliveryAddress, zip: e.target.value})} required />
                </div>
              </div>
            </section>

            <section className={styles.formSection}>
              <h2 className={styles.sectionHeader}><FaCalendarAlt /> Delivery Schedule</h2>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Preferred Date</label>
                  <input type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} min={new Date().toISOString().split('T')[0]} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Preferred Time</label>
                  <select value={deliveryTimeSlot} onChange={e => setDeliveryTimeSlot(e.target.value)}>
                    <option>Morning (8AM - 12PM)</option>
                    <option>Afternoon (12PM - 4PM)</option>
                    <option>Evening (4PM - 8PM)</option>
                  </select>
                </div>
              </div>
            </section>
            
            <section className={styles.formSection}>
                <h2 className={styles.sectionHeader}><FaInfoCircle/> Special Instructions (Optional)</h2>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <textarea value={specialInstructions} onChange={e => setSpecialInstructions(e.target.value)} placeholder="e.g., Call upon arrival"></textarea>
                </div>
            </section>
          </form>
        </div>

        <aside className={styles.summaryWrapper}>
          <h2 className={styles.summaryHeader}>Order Summary</h2>
          <div className={styles.summaryLine}>
            <span>{fuelType.name} ({quantity} {fuelType.unit})</span>
            <span>₹{priceDetails.subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.summaryLine}>
            <span>Delivery Fee</span>
            <span>₹{priceDetails.deliveryFee.toFixed(2)}</span>
          </div>
          <div className={styles.summaryLine}>
            <span>GST (18%)</span>
            <span>₹{priceDetails.gst.toFixed(2)}</span>
          </div>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>₹{priceDetails.totalPrice.toFixed(2)}</span>
          </div>
          <div className={styles.safetyBox}>Safety Guaranteed</div>
          <button type="submit" form="order-form" className={styles.submitButton} disabled={submitting}>
            {submitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </aside>
      </main>
    </div>
  );
};

export default OrderPage;