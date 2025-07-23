import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../context/AuthContext';
import styles from './LoginPage.module.css'; // Reuse login styles

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { resettoken } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    try {
      await api.put(`/api/users/resetpassword/${resettoken}`, { password });
      setMessage('Password reset successfully! You can now log in.');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper} style={{ maxWidth: '500px' }}>
        <div className={styles.formSection} style={{ width: '100%' }}>
          <h2>Reset Password</h2>
          {message && <p style={{ color: 'green', marginBottom: '1rem' }}>{message}</p>}
          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="password" className={styles.formLabel}>New Password</label>
            <input
              type="password"
              id="password"
              className={styles.formInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="confirmPassword" className={styles.formLabel}>Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              className={styles.formInput}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className={styles.submitButton}>Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;