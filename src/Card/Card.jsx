/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styles from './Card.module.css';

class Card extends React.Component {
  render() {
    return (
      <li className={styles.card}>
        <div className={styles.content}>Lorem ipsum dolor sit.</div>
        <div className={styles.info}>
          <div className={styles.createdDate}>10.02.2020, 15:50</div>
          <div className={styles.likes}>
            <button type="button">-</button>0<button type="button">+</button>
          </div>
        </div>
      </li>
    );
  }
}

export default Card;
