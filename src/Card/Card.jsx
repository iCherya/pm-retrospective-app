/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styles from './Card.module.css';
import Counter from '../Counter/Counter';

class Card extends React.Component {
  render() {
    return (
      <li className={styles.card}>
        <div className={styles.content}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, esse dignissimos?
        </div>
        <div className={styles.info}>
          <div className={styles.createdDate}>10.02.2020, 15:50</div>
          <Counter />
        </div>
      </li>
    );
  }
}

export default Card;
