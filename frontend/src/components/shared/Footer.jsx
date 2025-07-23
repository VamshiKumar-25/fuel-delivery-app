import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.about}>
            <h3 className={styles.logo}>FuelUp</h3>
            <p>
              Delivering convenience to your doorstep. High-quality fuel, whenever you need it.
            </p>
          </div>
          <div className={styles.links}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/dashboard">Home</Link></li>
              <li><Link to="/my-orders">My Orders</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>
          <div className={styles.contact}>
            <h4>Contact Us</h4>
            <p>Bengaluru, Karnataka, India</p>
            <p>Email: vamshi@gmail.com</p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2025 FuelUp. All Rights Reserved.</p>
          <div className={styles.socials}>
            <a href="https://www.facebook.com/vamshi.gvk.25"><FaFacebook /></a>
            <a href="https://x.com/Vamshi_Kumar25"><FaTwitter /></a>
            <a href="https://www.instagram.com/__.__vamshi__.__/"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;