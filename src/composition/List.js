import React from'react';
import './List.css';
import Card from './Card';

function List(props) {
    console.log(props);
    const cardsList = props.cards.map(function(card, i) {
        return <Card key={i} title={props.cards[i].title} content={props.cards[i].content} />
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
        </section>
    )
}

export default List;