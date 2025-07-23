import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false); // Close menu on logout
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/dashboard" className={styles.logo} onClick={closeMobileMenu}>
          FuelUp
        </Link>
        
        {/* --- Desktop Navigation --- */}
        <nav className={styles.desktopNav}>
          {user ? (
            <>
              <Link to="/dashboard" className={styles.navLink}>Home</Link>
              <Link to="/services" className={styles.navLink}>Services</Link>
              {/* <Link to="/track-order" className={styles.navLink}>Track Order</Link> */}
              <Link to="/my-orders" className={styles.navLink}>My Orders</Link>
              <Link to="/profile" className={styles.navLink}>Profile</Link>
              {user.role === 'admin' && (
                <>
                  <Link to="/admin/fuels" className={styles.navLink}>Fuel Mgmt</Link>
                  <Link to="/admin/orders" className={styles.navLink}>Order Mgmt</Link>
                </>
              )}
            </>
          ) : (
            <>
              <Link to="/services" className={styles.navLink}>Services</Link>
              <Link to="/login" className={styles.navLink}>Login</Link>
            </>
          )}
        </nav>

        {/* --- User Section for Desktop --- */}
        {user && (
           <div className={styles.desktopUserSection}>
            <span>{user.fullName}</span>
            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
          </div>
        )}

        {/* --- Hamburger Icon for Mobile --- */}
        <div className={styles.hamburger} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* --- Mobile Navigation Menu --- */}
        {isMobileMenuOpen && (
          <nav className={styles.mobileNav}>
            {user ? (
              <>
                <Link to="/dashboard" className={styles.navLink} onClick={closeMobileMenu}>Home</Link>
                <Link to="/services" className={styles.navLink} onClick={closeMobileMenu}>Services</Link>
                {/* <Link to="/track-order" className={styles.navLink} onClick={closeMobileMenu}>Track Order</Link> */}
                <Link to="/my-orders" className={styles.navLink} onClick={closeMobileMenu}>My Orders</Link>
                <Link to="/profile" className={styles.navLink} onClick={closeMobileMenu}>Profile</Link>

                {user.role === 'admin' && (
                  <>
                    <Link to="/admin/fuels" className={styles.navLink} onClick={closeMobileMenu}>Fuel Mgmt</Link>
                    <Link to="/admin/orders" className={styles.navLink} onClick={closeMobileMenu}>Order Mgmt</Link>
                  </>
                )}
                <button onClick={handleLogout} className={styles.mobileLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/services" className={styles.navLink} onClick={closeMobileMenu}>Services</Link>
                <Link to="/login" className={styles.navLink} onClick={closeMobileMenu}>Login</Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;