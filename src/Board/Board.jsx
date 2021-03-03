/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styles from './Board.module.css';
import Counter from '../Counter/Counter';
import Card from '../Card/Card';

class Board extends React.Component {
  render() {
    const { boardTitle, boardColor } = this.props;

    return (
      <div className={styles.board}>
        <div className={styles.top}>
          <div className={styles[boardColor]} />
          <h2 className={styles.heading}>{boardTitle}</h2>
          <Counter itemsCount="2" />
        </div>
        <button type="button" className={styles['add-btn']}>
          + Add note
        </button>
        <ul>
          <Card />
          <Card />
          <Card />
        </ul>
      </div>
    );
  }
}

export default Board;
