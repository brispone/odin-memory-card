import { useState } from 'react';
import '../styles/Card.css';

function Card({ card }) {


    return (
        <div className="card-front">
            <img src={card.image.url} />
            <h2 className="hero-name">{card.name}</h2>
        </div>
    );
}

export default Card