import React from'react';
import './List.css';
import Card from './Card';

function List(props) {
    const cardsList = props.cards.map(function(card, i) {
        return (
            <Card 
                key={i}
                id={props.cards[i].id}
                title={props.cards[i].title}
                content={props.cards[i].content}
                onDeleteCard={props.onDeleteCard}
            />
        )
    })

    return (
        <section className='List'>
            <header className='List-header'>
                <h2>
                    {props.header}
                </h2>
            </header>
            <div className='List-cards'>
                {cardsList}
            </div>
            <button 
                type='button'
                onClick={() => props.onAddCard(props.id)}>
                Add Random Card
            </button>
        </section>
    )
}

export default List;