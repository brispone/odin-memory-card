import { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import '../styles/Card.css';

function Card({ card }) {


    return (
        <div className="tilt-wrapper">
            <Tilt
                tiltReverse
                reset
                /*glareEnable={true}
                glareMaxOpacity={0.3}
                glarePosition='all'*/
                scale={1.1}>
                <div className="card-front">
                    <img src={card.image.url} />
                    <h2 className="hero-name">{card.name}</h2>
                </div>
            </Tilt>
        </div>
    );
}

export default Card