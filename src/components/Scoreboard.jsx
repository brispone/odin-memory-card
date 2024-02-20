import { useState } from 'react';
import '../styles/Scoreboard.css';

function Scoreboard({ currentScore, bestScore }) {


    return (
        <div>
            <h1>Current Score: {currentScore}</h1>
            <h1>Best Score: {bestScore}</h1>
        </div>
    );
}

export default Scoreboard