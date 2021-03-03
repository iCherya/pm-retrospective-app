/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styles from './App.module.css';
import Board from '../Board/Board';

class App extends React.Component {
  render() {
    return (
      <div className={styles.App}>
        <div className={styles.top}>
          <h1 className={styles.heading}>Team Retrospective</h1>
        </div>
        <div className={styles.wrapper}>
          <Board boardTitle="Good things" boardColor="green" />
          <Board boardTitle="Bad things" boardColor="red" />
          <Board boardTitle="Action items" boardColor="purple" />
        </div>
      </div>
    );
  }
}

export default App;
