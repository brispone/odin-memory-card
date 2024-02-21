import React from "react";
import '../styles/GameOverModal.css';

function GameOverModal({ isVisible, message, onReset }) {
    if(!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{message}</h2>
                <button onClick={onReset}>OKAY</button>
            </div>
        </div>
    )
}

export default GameOverModal