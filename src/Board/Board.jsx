/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styles from './Board.module.css';
import Card from '../Card/Card';

class Board extends React.Component {
  constructor() {
    super();
    this.state = { cardsCount: 0 };
  }

  render() {
    const { boardTitle, boardColor } = this.props;
    const { cardsCount } = this.state;

    return (
      <div className={styles.board}>
        <div className={styles.top}>
          <div className={styles[boardColor]} />
          <h2 className={styles.heading}>{boardTitle}</h2>
          <div className={styles.counter}>{cardsCount}</div>
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
