import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.brandSection}>
          {/* CHANGED: Replaced inline styles with CSS classes */}
          <h1 className={styles.brandTitle}>FuelUp</h1>
          <p className={styles.brandSubtitle}>Your Fuel, Delivered Fast.</p>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.formTitle}>Welcome Back</h2>
          <p className={styles.formSubtitle}>Sign in to continue</p>
          
          {/* CHANGED: Replaced inline style with a CSS class */}
          {error && <p className={styles.error}>{error}</p>}
          
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className={styles.formLabel}>Email Address</label>
              <input 
                type="email" 
                id="email"
                placeholder="test@example.com"
                className={styles.formInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className={styles.formLabel}>Password</label>
              <input 
                type="password" 
                id="password"
                placeholder="password123"
                className={styles.formInput}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className={styles.formActions}>
              <Link to="/forgot-password" className={styles.forgotPasswordLink}>
                Forgot Password?
              </Link>
            </div>

            <div>
              <button type="submit" className={styles.submitButton}>Sign In</button>
            </div>

            <div className={styles.signupLink}>
              <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;