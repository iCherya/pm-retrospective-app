import React from 'react';
import styles from './Card.module.css';
import Counter from '../Counter/Counter';

class Card extends React.Component {
  constructor(props) {
    super(props);

    const { card } = this.props;
    this.state = { ...card };

    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
  }

  static getHumanDateFormat(createdDate) {
    const monthValues = [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december'
    ];

    const dateObj = new Date(createdDate);

    const date = dateObj.getDate();
    const month = monthValues[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    const time = dateObj.toLocaleTimeString();

    return `${date} ${month} ${year}, ${time}`;
  }

  incrementCounter() {
    this.setState((previousState) => {
      const { counterValue } = previousState;

      return { counterValue: counterValue + 1 };
    });

    const { updateCounterValue } = this.props;
    const { createdDate } = this.state;
    updateCounterValue(createdDate, 1);
  }

  decrementCounter() {
    this.setState((previousState) => {
      const { counterValue } = previousState;

      return { counterValue: counterValue - 1 };
    });

    const { updateCounterValue } = this.props;
    const { createdDate } = this.state;
    updateCounterValue(createdDate, -1);
  }

  render() {
    const { createdDate, cardContent, counterValue } = this.state;
    const { mainColor } = this.props;
    return (
      <li className={styles.card} style={{ boxShadow: `0 5px 15px -9px ${mainColor}` }}>
        <div className={styles.content}>{cardContent}</div>
        <div className={styles.info}>
          <div className={styles.createdDate}>{Card.getHumanDateFormat(createdDate)}</div>
          <Counter
            counterValue={counterValue}
            incrementCounter={this.incrementCounter}
            decrementCounter={this.decrementCounter}
          />
        </div>
      </li>
    );
  }
}

export default Card;
