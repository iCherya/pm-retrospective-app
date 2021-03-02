/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styles from './App.module.css';

class App extends React.Component {
  render() {
    return (
      <div className={styles.App}>
        <h1 className={styles.heading}>Retrospective App</h1>
        <div>Hello world</div>
      </div>
    );
  }
}

export default App;
