import React from "react";
import '../styles/GameOverModal.css';

function GameOverModal({ isVisible, isWinner, onReset, backToMenu }) {
    if(!isVisible) return null;

    const headline = isWinner ? "You win!" : "Game over!";
    const message = isWinner ? "Great job. Try again on a higher difficulty!" : "Better luck next time! Maybe try again on a lower difficulty?";

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <h1>{headline}</h1>
                <p>{message}</p>
                <div className='modal-btns'>
                    <button className='btn' onClick={backToMenu}>MENU</button>
                    <button className='btn' onClick={onReset}>PLAY AGAIN</button>
                </div>
            </div>
        </div>
    )
}

export default GameOverModal