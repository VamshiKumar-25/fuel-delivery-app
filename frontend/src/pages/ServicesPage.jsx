import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ServicesPage.module.css';
import { FaCheckCircle, FaShippingFast, FaShieldAlt, FaMapMarkedAlt } from 'react-icons/fa';

const ServicesPage = () => {
  return (
    <div className={styles.page}>

      {/* This page will be rendered inside our Layout, so it gets the Header/Footer automatically */}
      <div className={styles.container}>
        
        {/* --- Services Header --- */}
        <section className={styles.section}>
          <h2>Our Services</h2>
          <p>Professional fuel delivery services for residential, commercial, and fleet customers.</p>
        </section>

        {/* --- Fuel Types --- */}
        <section className={styles.section}>
          <div className={styles.fuelGrid}>
            <div className={styles.fuelCard}>
              <h3>Regular Petrol</h3>
              <p className={styles.price}>Starting at ₹102/litre</p>
              <p className={styles.description}>Standard blend petrol perfect for most passenger vehicles, SUVs, and light trucks.</p>
              <ul>
                <li><FaCheckCircle className={styles.checkIcon} /> EPA approved and tested</li>
                <li><FaCheckCircle className={styles.checkIcon} /> Suitable for most vehicles</li>
              </ul>
            </div>
            <div className={styles.fuelCard}>
              <h3>Premium Petrol</h3>
              <p className={styles.price}>Starting at ₹112/litre</p>
              <p className={styles.description}>High-grade fuel designed for luxury vehicles, sports cars, and high-compression engines.</p>
               <ul>
                <li><FaCheckCircle className={styles.checkIcon} /> Higher octane rating</li>
                <li><FaCheckCircle className={styles.checkIcon} /> Recommended for luxury vehicles</li>
              </ul>
            </div>
            {/* Add Diesel and Fleet cards similarly */}
          </div>
        </section>

        {/* --- Why Choose Us --- */}
        <section className={styles.section}>
          <h2>Why Choose FuelUp?</h2>
          <div className={styles.threeColGrid}>
            <div className={styles.featureCard}>
              <FaShippingFast size={32} style={{ color: '#553c9a', marginBottom: '1rem'}} />
              <h3>Fast Delivery</h3>
              <p>Same-day delivery available. Most orders delivered within 2-4 hours of placement.</p>
            </div>
            <div className={styles.featureCard}>
              <FaShieldAlt size={32} style={{ color: '#553c9a', marginBottom: '1rem'}} />
              <h3>Safe & Secure</h3>
              <p>Licensed professionals with safety-certified equipment and comprehensive insurance coverage.</p>
            </div>
            <div className={styles.featureCard}>
              <FaMapMarkedAlt size={32} style={{ color: '#553c9a', marginBottom: '1rem'}} />
              <h3>Convenient Locations</h3>
              <p>We deliver anywhere within our service area - your home, job site, or roadside.</p>
            </div>
          </div>
        </section>

        {/* --- How It Works --- */}
        <section className={styles.section}>
            <h2>How It Works</h2>
            <div className={styles.howItWorksGrid}>
                <div className={styles.step}>
                    <div className={styles.stepNumber}>1</div>
                    <h4>Place Order</h4>
                    <p>Select fuel type, quantity, and delivery details online or by phone.</p>
                </div>
                <div className={styles.step}>
                    <div className={styles.stepNumber}>2</div>
                    <h4>Confirmation</h4>
                    <p>Receive order confirmation with delivery time estimate via email and SMS.</p>
                </div>
                <div className={styles.step}>
                    <div className={styles.stepNumber}>3</div>
                    <h4>Delivery</h4>
                    <p>Our certified driver arrives at your location with your fuel order.</p>
                </div>
                <div className={styles.step}>
                    <div className={styles.stepNumber}>4</div>
                    <h4>Payment</h4>
                    <p>Pay securely upon delivery with cash, UPI, or cards.</p>
                </div>
            </div>
        </section>

        {/* --- Call to Action --- */}
        <section className={`${styles.section} ${styles.cta}`}>
            <h2>Ready to Get Started?</h2>
            <p>Experience the convenience of professional fuel delivery today.</p>
            <Link to="/dashboard#fuels" className={styles.ctaButton}>Order Fuel Now</Link>
        </section>

      </div>
    </div>
  );
};

export default ServicesPage;