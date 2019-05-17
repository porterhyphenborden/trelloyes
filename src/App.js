import React from 'react';
import './App.css';
import List from './composition/List';


function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
        key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      store: props.store
    }
  }
  static defaultProps = {
    store: {
      lists: [],
      allCards: {},
    }
  }


  handleDeleteCard = (cardId) => {
    console.log('handle delete card called')
    const lists = this.state.store.lists;
    const allCards = this.state.store.allCards;

    const newLists = lists.map(list => ({
      ...list,
      cardIds: list.cardIds.filter(id => id !== cardId)
    }));

    const newCards = omit(allCards, cardId);

    this.setState({
      store: {
        lists: newLists,
        allCards: newCards
      }
    })
  };

  handleAddCard = (listId) => {
    console.log('handle add card called')
    const newCard = newRandomCard();
    const newLists = this.state.store.lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cardIds: [...list.cardIds, newCard.id]
        };
      }
      return list;
    })
    this.setState({
      store: {
        lists: newLists,
        allCards: {
          ...this.state.store.allCards,
          [newCard.id]: newCard
        }
      }
    })
  };
  
  renderList() {
    const store = this.state.store
    console.log(store)
    const newList = store.lists.map(function(list, i) {
      return (<List 
        key={store.lists[i].id} 
        header={store.lists[i].header} 
        cards={store.lists[i].cardIds.map(id => store.allCards[id])}
        onDeleteCard={this.handleDeleteCard}
        onAddCard={this.handleAddCard}
      />)
    });
    return newList
  }

  render() {
    const store = this.state.store
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map((list, i) => (
            <List 
              key={store.lists[i].id} 
              id={store.lists[i].id}
              header={store.lists[i].header} 
              cards={store.lists[i].cardIds.map(id => store.allCards[id])}
              onDeleteCard={this.handleDeleteCard}
              onAddCard={this.handleAddCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;