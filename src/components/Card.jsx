import { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import '../styles/Card.css';

function Card({ card, onClick, isShuffling }) {

    function handleClick() {
        onClick(card);
    }

    return (
        <div className="tilt-wrapper">
            <Tilt
                tiltReverse
                reset
                /*glareEnable={true}
                glareMaxOpacity={0.3}
                glarePosition='all'*/
                scale={1.1}>
            {isShuffling ? (
                // Render the card back when isShuffling is true
                    <div className="card-back">
                    </div>
                ) : (
                // Render the card front when isShuffling is false
                    <div className="card-front" onClick={handleClick}>
                    <img src={card.image.url} alt={card.name} draggable="false" />
                    <h2 className="hero-name">{card.name}</h2>
                </div>
                )}
            </Tilt>
        </div>
    );
}

export default Card