import React from 'react';
import './App.css';
import List from './composition/List';

function App(props) {
  const store = props.store;
  console.log(store);
  const newList = store.lists.map(function(list, i) {
    return <List 
      key={store.lists[i].id} 
      header={store.lists[i].header} 
      cards={store.lists[i].cardIds.map(id => store.allCards[id])}
    />
  });
  return (
    <main className='App'>
      <header className='App-header'>
        <h1>Trelloyes!</h1>
      </header>
      <div className='App-list'>
        {newList}
      </div>
    </main>
  );
}

export default App;
