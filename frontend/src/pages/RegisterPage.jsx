import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api, { useAuth } from '../context/AuthContext';
import styles from './LoginPage.module.css';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setSubmitting(true);
    try {
      // Step 1: Call the registration endpoint.
      // We expect the new user data and token back if successful.
      const { data } = await api.post('/api/users', {
        fullName,
        username,
        email,
        password,
      });

      // Step 2: Check if registration was successful.
      if (data && data.token) {
        // Step 3: If it was, THEN log the user in automatically.
        const loginSuccess = await login(email, password);
        if (loginSuccess) {
          navigate('/dashboard');
        } else {
          setError('Account created, but auto-login failed. Please go to the login page.');
        }
      } else {
        // This case should not happen if the backend is working correctly
        setError('An unexpected error occurred during registration.');
      }
    } catch (err) {
      // This will now correctly catch the "User already exists" error from the backend
      setError(err.response?.data?.message || 'Failed to register.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.brandSection}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Join FuelUp</h1>
          <p style={{ fontSize: '1.125rem', color: '#a0aec0' }}>Fuel at Your Fingertips.</p>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.formTitle}>Create Account</h2>
          <p className={styles.formSubtitle}>Get started in seconds</p>
         
          {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
          
          <form onSubmit={handleRegister}>
            {/* Input fields remain the same */}
            <label className={styles.formLabel}>Full Name</label>
            <input type="text" placeholder="Vamshi Kumar" className={styles.formInput} value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            <label className={styles.formLabel}>Username</label>
            <input type="text" placeholder="Vamshi_Kumar" className={styles.formInput} value={username} onChange={(e) => setUsername(e.target.value)} required />
            <label className={styles.formLabel}>Email Address</label>
            <input type="email" placeholder="vamshi@example.com" className={styles.formInput} value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label className={styles.formLabel}>Password</label>
            <input type="password" placeholder="........" className={styles.formInput} value={password} onChange={(e) => setPassword(e.target.value)} required />
            <label className={styles.formLabel}>Confirm Password</label>
            <input type="password" placeholder="........" className={styles.formInput} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            
            <button type="submit" className={styles.submitButton} disabled={submitting}>
              {submitting ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className={styles.signupLink}>
              <p>Already have an account? <Link to="/login">Sign In</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;