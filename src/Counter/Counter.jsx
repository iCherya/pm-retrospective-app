/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styles from './Counter.module.css';

class Counter extends React.Component {
  render() {
    const { itemsCount } = this.props;

    return <div className={styles.counter}>{itemsCount}</div>;
  }
}

export default Counter;
