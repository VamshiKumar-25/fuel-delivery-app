import React from 'react';
import styles from './AboutUsPage.module.css';
import { FaBullseye, FaUsers, FaHistory } from 'react-icons/fa';

const AboutUsPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1>About FuelUp</h1>
        <p>Revolutionizing Fuel Delivery with Technology and Trust</p>
      </div>

      <div className={styles.container}>
        <section className={styles.section}>
          <div className={styles.sectionIcon}><FaBullseye /></div>
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide a seamless, safe, and efficient on-demand fuel delivery service. We leverage cutting-edge technology to ensure that you, our valued customer, never have to waste time at a gas station again. We are committed to reliability, safety, and ultimate convenience.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionIcon}><FaHistory /></div>
          <h2>Our Story</h2>
          <p>
            Founded in Bengaluru in 2024, FuelUp was born from a simple idea: why do we still drive to get fuel when everything else comes to us? Our founders, a team of tech enthusiasts and logistics experts, set out to solve this everyday inconvenience. Starting with just two delivery vehicles, we've grown into a trusted city-wide service, dedicated to making life easier one delivery at a time.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionIcon}><FaUsers /></div>
          <h2>Meet the Team</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <img src="https://i.pravatar.cc/150?img=12" alt="CEO" />
              <h3>Vamshi Kumar</h3>
              <p>CEO & Founder</p>
            </div>
            <div className={styles.teamMember}>
              <img src="https://i.pravatar.cc/150?img=32" alt="Head of Operations" />
              <h3>Likhitha</h3>
              <p>CTO & Head of Operations</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;