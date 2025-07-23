import React from 'react';
import styles from './OrderStatusTracker.module.css';

const OrderStatusTracker = ({ status }) => {
  const statuses = ['Pending', 'Confirmed', 'Out for Delivery', 'Delivered'];
  const currentStatusIndex = statuses.indexOf(status);

  return (
    <div className={styles.timeline}>
      {statuses.map((s, index) => {
        const isCompleted = index < currentStatusIndex;
        const isActive = index === currentStatusIndex;
        
        let statusClass = styles.timelineStep;
        if (isCompleted) statusClass += ` ${styles.completed}`;
        else if (isActive) statusClass += ` ${styles.active}`;

        return (
          <div key={s} className={statusClass}>
            <div className={styles.timelineNode}></div>
            {index < statuses.length - 1 && <div className={styles.timelineLine}></div>}
            <div className={styles.timelineContent}><p>{s}</p></div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderStatusTracker;