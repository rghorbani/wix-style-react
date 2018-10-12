import React from 'react';
import styles from './MyStyles.scss';

export default () => (
  <div>
    <h1 className={styles.myHeading}>This is my heading</h1>
    <span className={styles.myText}>
      This is a my text
    </span>
  </div>
);
