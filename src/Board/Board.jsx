import React from 'react';
import styles from './Board.module.css';
import Card from '../Card/Card';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      isAddingCard: false,
      cardCandidateValue: ''
    };

    this.createCard = this.createCard.bind(this);
    this.sortCards = this.sortCards.bind(this);
    this.updateCounterValue = this.updateCounterValue.bind(this);
    this.toggleCardAddingMode = this.toggleCardAddingMode.bind(this);
    this.handleCardSubmit = this.handleCardSubmit.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
  }

  handleCardChange(e) {
    this.setState({ cardCandidateValue: e.target.value });
  }

  handleCardSubmit(e) {
    e.preventDefault();

    const { cardCandidateValue } = this.state;
    if (cardCandidateValue.trim() === '') return;

    this.createCard(cardCandidateValue);
    this.toggleCardAddingMode();
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

  sortCards() {
    this.setState((previousState) => {
      const { cards } = previousState;

      return { cards: cards.sort((a, b) => b.counterValue - a.counterValue) };
    });
  }

  createCard(cardContent) {
    const card = {
      createdDate: Date.now(),
      cardContent,
      counterValue: 0
    };

    this.setState((previousState) => {
      const { cards } = previousState;

      return { cards: [...cards, card] };
    });

    this.sortCards();
  }

  deleteCard(createdDate) {
    this.setState((previousState) => {
      const { cards } = previousState;

      return { cards: cards.filter((card) => card.createdDate !== createdDate) };
    });
  }

  toggleCardAddingMode() {
    this.setState((previousState) => {
      const { isAddingCard } = previousState;

      return {
        isAddingCard: !isAddingCard,
        cardCandidateValue: ''
      };
    });
  }

  render() {
    const { boardTitle, boardColor } = this.props;
    const { cards, isAddingCard } = this.state;

    return (
      <div className={styles.board}>
        <div className={styles.top}>
          <div className={styles.icon} style={{ backgroundColor: boardColor }} />
          <h2 className={styles.heading}>{boardTitle}</h2>
          <div className={styles.counter}>{cards.length}</div>
        </div>
        {isAddingCard ? (
          <form onSubmit={this.handleCardSubmit}>
            <textarea
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              required
              className={styles.textarea}
              onChange={this.handleCardChange}
            />
            <button type="submit" className={styles['submit-btn']}>
              Add Card
            </button>
          </form>
        ) : (
          <button type="button" className={styles['add-btn']} onClick={this.toggleCardAddingMode}>
            + Create new note
          </button>
        )}

        <ul>
          {cards.map((card) => (
            <Card
              key={card.createdDate}
              mainColor={boardColor}
              card={card}
              updateCounterValue={this.updateCounterValue}
              deleteCard={this.deleteCard}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Board;
