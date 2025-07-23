import React, { useState, useEffect } from 'react';
import api from '../context/AuthContext';
import styles from './AdminFuelManagement.module.css';

const AdminFuelManagement = () => {
  const [fuelTypes, setFuelTypes] = useState([]);
  const [name, setName] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [unit, setUnit] = useState('liter');
  const [error, setError] = useState('');

  const fetchFuelTypes = async () => {
    try {
      const { data } = await api.get('/api/fueltypes');
      setFuelTypes(data);
    } catch (err) {
      console.error('Failed to fetch fuel types', err);
    }
  };

  useEffect(() => {
    fetchFuelTypes();
  }, []);

  const handleAddFuel = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/api/fueltypes', { name, pricePerUnit, unit });
      setName('');
      setPricePerUnit('');
      setUnit('liter');
      fetchFuelTypes(); // Refresh the list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add fuel type');
    }
  };

  const handleDeleteFuel = async (id) => {
    if (window.confirm('Are you sure you want to delete this fuel type?')) {
      try {
        await api.delete(`/api/fueltypes/${id}`);
        fetchFuelTypes(); // Refresh the list
      } catch (err) {
        console.error('Failed to delete fuel type', err);
      }
    }
  };

  return (
    <div>
      <main className={styles.container}>
        <h1>Fuel Management</h1>
        <div className={styles.contentWrapper}>
          <div className={styles.formContainer}>
            <h2>Add New Fuel Type</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleAddFuel} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Fuel Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Premium Petrol"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Price per Unit (₹)</label>
                <input
                  type="number"
                  value={pricePerUnit}
                  onChange={(e) => setPricePerUnit(e.target.value)}
                  placeholder="e.g., 110.50"
                  step="0.01"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Unit</label>
                <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                  <option value="liter">liter</option>
                  <option value="kWh">kWh</option>
                </select>
              </div>
              <button type="submit" className={styles.addButton}>Add Fuel</button>
            </form>
          </div>

          <div className={styles.tableContainer}>
            <h2>Existing Fuel Types</h2>
            <table className={styles.fuelTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Unit</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fuelTypes.map((fuel) => (
                  <tr key={fuel._id}>
                    <td>{fuel.name}</td>
                    <td>₹{fuel.pricePerUnit.toFixed(2)}</td>
                    <td>{fuel.unit}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteFuel(fuel._id)}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminFuelManagement;