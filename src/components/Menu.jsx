import '../styles/Menu.css';

function Menu({ startGame }) {

    function startEasyGame() {
        startGame(5);
    }

    function startMediumGame() {
        startGame(10);
    }

    function startHardGame() {
        startGame(15);
    }

    return (
        <div className='menu'>
            <div className='btn-container'>
                <button className='btn' onClick={startEasyGame}>EASY</button>
                <button className='btn' onClick={startMediumGame}>MEDIUM</button>
                <button className='btn' onClick={startHardGame}>HARD</button>
            </div>
        </div>
    )
}

export default Menu