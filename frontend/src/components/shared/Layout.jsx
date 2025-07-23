import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.appContainer}>
      <Header />
      <main className={styles.mainContent}>
        {/* The <Outlet /> is where your page components (like LoginPage, Dashboard, etc.) will be rendered by React Router */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;