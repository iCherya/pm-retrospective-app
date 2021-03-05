import React from 'react';
import classNames from 'classnames';
import styles from './Card.module.css';
import Counter from '../Counter/Counter';

class Card extends React.Component {
  constructor(props) {
    super(props);

    const { card } = this.props;
    this.state = { ...card, isDragging: false };

    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.dragEndHandler = this.dragEndHandler.bind(this);
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

  dragStartHandler(e) {
    this.toggleDraggingMode();
    e.dataTransfer.setData('card', [Object.entries(this.state)]);
  }

  dragEndHandler(e) {
    this.toggleDraggingMode();
    const { deleteCard } = this.props;
    const { createdDate } = this.state;
    if (e.dataTransfer.dropEffect !== 'none') {
      deleteCard(createdDate);
    }
  }

  toggleDraggingMode() {
    this.setState((previousState) => {
      const { isDragging } = previousState;

      return { isDragging: !isDragging };
    });
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
    const { createdDate, cardContent, counterValue, isDragging } = this.state;
    const { boardColor, deleteCard } = this.props;

    return (
      <li
        draggable
        className={classNames(styles.card, isDragging ? styles.selected : null)}
        style={{ boxShadow: `0 5px 15px -9px ${boardColor}` }}
        onDragStart={this.dragStartHandler}
        onDragEnd={this.dragEndHandler}
      >
        <div className={styles.content}>{cardContent}</div>
        <div className={styles.info}>
          <div className={styles.createdDate}>{Card.getHumanDateFormat(createdDate)}</div>
          <button
            type="button"
            className={styles['delete-btn']}
            onClick={() => deleteCard(createdDate)}
          >
            &#128465;
          </button>
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
