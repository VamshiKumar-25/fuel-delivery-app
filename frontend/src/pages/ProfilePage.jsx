import React, { useState, useEffect } from 'react';
import api, { useAuth } from '../context/AuthContext';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  // CHANGED: Get the new updateAuthUser function from the context
  const { user, updateAuthUser } = useAuth(); 
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setUsername(user.username);
      setPhone(user.phone || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password && password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      const { data: updatedUserWithToken } = await api.put('/api/users/profile', {
        fullName,
        username,
        phone,
        password,
      });

      // CHANGED: Call the new function to update localStorage
      updateAuthUser(updatedUserWithToken); 
      
      setMessage('Profile updated successfully!');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>My Profile</h1>
      <p className={styles.subtitle}>View and update your account details.</p>

      <form onSubmit={handleSubmit} className={styles.profileForm}>
        {message && <p className={styles.message}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}

        <section className={styles.formSection}>
          <h2>Personal Details</h2>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name</label>
            <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
           <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </section>
        
        <section className={styles.formSection}>
          <h2>Change Password</h2>
          <p className={styles.sectionDescription}>Leave blank to keep your current password.</p>
          <div className={styles.formGroup}>
            <label htmlFor="password">New Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
           <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
        </section>

        <button type="submit" className={styles.submitButton}>Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;