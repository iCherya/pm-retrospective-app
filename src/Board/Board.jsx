/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styles from './Board.module.css';
import Card from '../Card/Card';

class Board extends React.Component {
  constructor(props) {
    super(props);
    const { boardTitle } = this.props;
    this.state = {
      cards: [
        {
          createdDate: Date.now(),
          cardContent: boardTitle + Date.now(),
          counterValue: Math.round((Math.random() - 0.5) * 10)
        }
      ],
      isAddingCard: false,
      cardCandidateValue: '',
      isCurrentBoard: true
    };

    this.createCard = this.createCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.sortCards = this.sortCards.bind(this);
    this.updateCounterValue = this.updateCounterValue.bind(this);
    this.toggleCardAddingMode = this.toggleCardAddingMode.bind(this);
    this.handleCardSubmit = this.handleCardSubmit.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
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

  static handleDragover(e) {
    e.preventDefault();
  }

  handleDrop(e) {
    console.log('drop', this.props, e);

    const dataTransfer = e.dataTransfer.getData('card').split(',');
    const card = {};

    for (let i = 0; i < dataTransfer.length; i += 2) {
      const key = dataTransfer[i];
      const value = dataTransfer[i + 1];
      card[key] = Number.isNaN(+value) ? value : +value;
    }

    const { cards } = this.state;
    const isCurrentBoard = cards.find((el) => el.createdDate === card.createdDate);

    if (!isCurrentBoard) {
      this.setState((previousState) => {
        const { cards } = previousState;

        return {
          cards: [...cards, card]
        };
      });

      this.sortCards();
    }
  }

  deleteCard(createdDate) {
    this.setState((previousState) => {
      const { cards } = previousState;
      const filtered = cards.filter((el) => el.createdDate !== createdDate);

      return {
        cards: filtered
      };
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

  render() {
    console.log('render');
    const { boardTitle, boardColor } = this.props;
    const { cards, isAddingCard, isDragover } = this.state;

    return (
      <div className={styles.board} onDrop={this.handleDrop} onDragOver={Board.handleDragover}>
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
        {isDragover ? <div className={styles['shadow-card']} /> : null}
        <ul>
          {cards.map((card) => (
            <Card
              // key={card.createdDate}
              key={performance.now()}
              boardColor={boardColor}
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
