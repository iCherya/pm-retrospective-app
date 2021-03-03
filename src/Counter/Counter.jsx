/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styles from './Counter.module.css';

class Counter extends React.Component {
  constructor() {
    super();
    this.state = { count: 0 };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    const { count } = this.state;
    this.setState({ count: count + 1 });
  }

  decrement() {
    const { count } = this.state;
    this.setState({ count: count - 1 });
  }

  render() {
    const { count } = this.state;

    return (
      <div className={styles.counter}>
        <button type="button" onClick={this.decrement}>
          -
        </button>
        <span>{count}</span>
        <button type="button" onClick={this.increment}>
          +
        </button>
      </div>
    );
  }
}

export default Counter;
