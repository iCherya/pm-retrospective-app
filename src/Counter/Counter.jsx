import React from 'react';
import styles from './Counter.module.css';

const Counter = (props) => {
  const { counterValue, incrementCounter, decrementCounter } = props;

  return (
    <div className={styles.counter}>
      <button type="button" onClick={decrementCounter}>
        -
      </button>
      <span>{counterValue}</span>
      <button type="button" onClick={incrementCounter}>
        +
      </button>
    </div>
  );
};

export default Counter;
