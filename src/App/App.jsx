/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styles from './App.module.css';
import Board from '../Board/Board';
import config from '../config';

class App extends React.Component {
  render() {
    const { boards } = config;

    return (
      <div className={styles.App}>
        <div className={styles.top}>
          <h1 className={styles.heading}>Team Retrospective</h1>
        </div>

        <div className={styles.wrapper}>
          {boards.map(({ id, title, color }) => (
            <Board key={id} boardTitle={title} boardColor={color} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
