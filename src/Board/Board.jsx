import React from 'react';
import styles from './Board.module.css';
import Card from '../Card/Card';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {
          createdDate: Date.now(),
          cardContent: 'Lorem input',
          counterValue: 4
        }
      ]
    };

    this.createCard = this.createCard.bind(this);
    this.sortCards = this.sortCards.bind(this);
    this.updateCounterValue = this.updateCounterValue.bind(this);
  }

  sortCards() {
    this.setState((previousState) => {
      const { cards } = previousState;

      return { cards: cards.sort((a, b) => b.counterValue - a.counterValue) };
    });
  }

  updateCounterValue(createdDate, value) {
    this.setState((previousState) => {
      const { cards } = previousState;

      return {
        cards: cards.map((card) =>
          card.createdDate === createdDate
            ? { ...card, counterValue: card.counterValue + value }
            : card
        )
      };
    });

    const { cards } = this.state;
    if (cards.length > 1) this.sortCards();
  }

  createCard() {
    const card = {
      createdDate: Date.now(),
      cardContent: 'Lorem input',
      counterValue: 0
    };

    this.setState((previousState) => {
      const { cards } = previousState;

      return { cards: [...cards, card] };
    });

    this.sortCards();
  }

  render() {
    const { boardTitle, boardColor } = this.props;
    const { cards } = this.state;

    return (
      <div className={styles.board}>
        <div className={styles.top}>
          <div className={styles.icon} style={{ backgroundColor: boardColor }} />
          <h2 className={styles.heading}>{boardTitle}</h2>
          <div className={styles.counter}>{cards.length}</div>
        </div>

        <button type="button" className={styles['add-btn']} onClick={this.createCard}>
          + Add note
        </button>

        <ul>
          {cards.map((card) => (
            <Card key={card.createdDate} card={card} updateCounterValue={this.updateCounterValue} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Board;
