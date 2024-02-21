import { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import '../styles/Card.css';

function Card({ card, onClick, isShuffling }) {
    const [flipState, setFlipState ] = useState('front');

    useEffect(() => {
        if (isShuffling) {
            setFlipState('exit'); // Begin exiting (flipping out)
            setTimeout(() => {
                setFlipState('enter'); // Begin entering (flipping in) after half duration
            }, 600); // Assuming your animation is 0.6s, adjust this timing as needed - prev 600
        } else {
            setFlipState('front');
        }
    }, [isShuffling]);

    function handleClick() {
        if(!isShuffling) {
            onClick(card);
        }   
    }
/*
        // Conditionally wrap the card front with Tilt or directly return the card back
        const cardContent = isShuffling ? (
            // Render the card back when isShuffling is true
            <div className="card-back">
            </div>
        ) : (
            // Wrap the card front with Tilt when isShuffling is false
            <Tilt tiltReverse reset scale={1.1}>
                <div className="card-front" onClick={handleClick}>
                    <img src={card.image.url} alt={card.name} draggable="false" />
                    <h2 className="hero-name">{card.name}</h2>
                </div>
            </Tilt>
        );
    
        return (
            <div className="tilt-wrapper">
                {cardContent}
            </div>
        );*/

        const cardContent = flipState === 'front' || flipState === 'enter' ? (
            // Wrap the card front with Tilt when not shuffling or flipping in
            <Tilt tiltReverse reset scale={1.1} className={flipState === 'enter' ? 'flip-enter' : ''}>
                <div className="card-front" onClick={handleClick}>
                    <img src={card.image.url} alt={card.name} draggable="false" />
                    <h2 className="hero-name">{card.name}</h2>
                </div>
            </Tilt>
        ) : (
            // Render the card back when flipping out
            <div className="card-back flip-exit"></div>
        );
    
        return <div className="tilt-wrapper">{cardContent}</div>;
}

export default Card