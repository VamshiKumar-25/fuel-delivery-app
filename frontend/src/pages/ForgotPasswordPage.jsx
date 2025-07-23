import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import api from '../context/AuthContext';
import styles from './ForgotPasswordPage.module.css'; // CHANGED: Use the new stylesheet

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await api.post('/api/users/forgotpassword', { email });
      setMessage('If an account with that email exists, a reset link has been generated in the backend console.');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2>Forgot Password</h2>
        <p>Enter your email to receive a reset link.</p>
        
        {message && <p className={styles.message}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className={styles.formLabel}>Email Address</label>
          <input
            type="email"
            id="email"
            className={styles.formInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
          <button type="submit" className={styles.submitButton}>Send Reset Link</button>
          <div className={styles.backLink}>
            <Link to="/login">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;