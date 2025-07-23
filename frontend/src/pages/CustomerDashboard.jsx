import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './CustomerDashboard.module.css';
import { FaShippingFast, FaClock, FaShieldAlt } from 'react-icons/fa';

const CustomerDashboard = () => {
  // Re-introduced state and effects to fetch fuel data
  const [fuelTypes, setFuelTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFuelTypes = async () => {
      try {
        const { data } = await axios.get('http://localhost:5001/api/fueltypes');
        setFuelTypes(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch fuel types:', error);
        setLoading(false);
      }
    };

    fetchFuelTypes();
  }, []);

  return (
    <div className={styles.page}>      
      {/* --- Hero Section --- */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1>Fuel Delivered to Your Doorstep</h1>
            <h2>Now serving Bengaluru</h2>
            <p>
              Never wait in line at a gas station again. Get high-quality fuel delivered
              safely and conveniently to your home or office.
            </p>
            {/* This button now links to the fuel section below */}
            <a href="#fuels" className={styles.ctaButton}>
              See Available Fuels
            </a>
          </div>
          <div className={styles.heroImage}>
            <img src="/fuel.jpeg" alt="Fuel cans in a warehouse" />
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className={styles.features}>
        <div className={styles.featuresContainer}>
          <h2>Why Choose FuelUp?</h2>
          <p>We provide a seamless and reliable fuel delivery experience.</p>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <FaShippingFast className={styles.featureIcon} />
              <h3>Convenient Delivery</h3>
              <p>Schedule a delivery to your location at a time that works for you.</p>
            </div>
            <div className={styles.featureCard}>
              <FaClock className={styles.featureIcon} />
              <h3>Fast Service</h3>
              <p>Our efficient logistics ensure your fuel arrives on time, every time.</p>
            </div>
            <div className={styles.featureCard}>
              <FaShieldAlt className={styles.featureIcon} />
              <h3>Safe & Secure</h3>
              <p>All deliveries are handled by trained professionals with certified equipment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Re-integrated Available Fuels Section --- */}
      <section id="fuels" className={styles.fuelSection}>
        <div className={styles.fuelContainer}>
            <h2>Available Fuels for Delivery</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className={styles.fuelGrid}>
                {fuelTypes.map((fuel) => (
                    <div key={fuel._id} className={styles.fuelCard}>
                    <h3>{fuel.name}</h3>
                    <p className={styles.fuelPrice}>
                        ₹{fuel.pricePerUnit.toFixed(2)} / {fuel.unit}
                    </p>
                    <Link to={`/order/${fuel._id}`} className={styles.orderButton}>
                        Order Now
                    </Link>
                    </div>
                ))}
                </div>
            )}
        </div>
      </section>

      {/* --- Call to Action Section --- */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2>Ready to Get Started?</h2>
          <p>
            Experience the future of fuel delivery. Place your first order today and
            enjoy the convenience of FuelUp.
          </p>
          <a href="#fuels" className={styles.ctaButton}>
            Order Fuel Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default CustomerDashboard;