import { useState } from 'react'

function Square({num, sign, status, handleClick}) {
    let btnClass = 'square ';
    if (status && status.length) {
        if (status.includes(num)) {
            btnClass += 'square--winner';
        } else {
            btnClass += 'square--none';
        }
    } else {
        btnClass += sign === 'O' ? 
            'square--o' : sign === 'X' ?
            'square--x' : 'square--empty square--dynamic';
    }

    return (
        <button
        className={btnClass}
        onClick={handleClick}
        >
            {sign}
        </button>
    );
}

function Board({cells, winCombination, handleClick}) {
    return (
        <section className="game__board">
            <Square num={0} sign={cells[0]} status={winCombination} handleClick={handleClick(0)} />
            <Square num={1} sign={cells[1]} status={winCombination} handleClick={handleClick(1)} />
            <Square num={2} sign={cells[2]} status={winCombination} handleClick={handleClick(2)} />
            <Square num={3} sign={cells[3]} status={winCombination} handleClick={handleClick(3)} />
            <Square num={4} sign={cells[4]} status={winCombination} handleClick={handleClick(4)} />
            <Square num={5} sign={cells[5]} status={winCombination} handleClick={handleClick(5)} />
            <Square num={6} sign={cells[6]} status={winCombination} handleClick={handleClick(6)} />
            <Square num={7} sign={cells[7]} status={winCombination} handleClick={handleClick(7)} />
            <Square num={8} sign={cells[8]} status={winCombination} handleClick={handleClick(8)} />
        </section>
    );
}

export default function Game () {
    const [cells, setCells] = useState(Array(9).fill(null));
    const [winCombination, setWinCombination] = useState(null);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [move, setMove] = useState(0);

    const isX = move % 2 === 0;
    const currentSign = isX ? 'X' : 'O';

    function handleClick(cell) {
        return () => {
            if (calculateWinner(cells) || cells[cell]) {
                return;
            }

            const cellsCopy = [...cells];
            cellsCopy[cell] = currentSign;
            setCells(cellsCopy);

            const historyCopy = [...history.splice(0, move+1), cellsCopy];
            setHistory(historyCopy);

            const win = calculateWinner(cellsCopy);
            setWinCombination(win);
            if (!win) {
                setMove(move + 1);
            }
        }
    }

    function loadRecord(move) {
        setMove(move);
        setCells(history[move]);
        setWinCombination(calculateWinner(history[move]));
    }

    const moves = history.map((historySegment, move) => {
        let historyBoard = historySegment.map((el, index) => {
            let className = 'game__history__board__square ';
            if (!el) {
                className += 'square--empty';
            } else {
                if (el === 'X') {
                    className += 'square--x';
                } else {
                    className += 'square--o';
                }
            }
            return (
                <div key={index} className={className}></div>
            );
        })

        return (
            <li key={move}>
                <button className='game__history__board' onClick={() => {loadRecord(move)}}>
                    {historyBoard}
                </button>
            </li>
        );
    });

    let header;
    if (winCombination) {
        if (winCombination.length) {
            const currentSign = cells[winCombination[0]];
            const className = ("sign__highlight--" + currentSign).toLowerCase();
            header = (
            <>
                <span className={className}>{currentSign}</span> Won!
            </>);
        } else {
            header = (<span className='sign__highlight--draw'>Draw!</span>);
        }
    } else {
        const className = ("sign__highlight--" + currentSign).toLowerCase();
        header = (
        <>
            Current move: <span className={className}>{currentSign}</span>
        </>);
    }

    return (
        <main id="game">
            <header className='game__header'>Tic Tac Toe</header>
            <section className='game'>
                <div className='game__container'>
                    <p className='game__status'> {header} </p>
                    <Board cells={cells} winCombination={winCombination} handleClick={handleClick} />
                </div>
                <div className='game__history'>
                    <header className='game__history__header'>History</header>
                    <ul className='game__history__list'>
                        {moves}
                    </ul>
                </div>
            </section>
        </main>
    );
}

function calculateWinner (cells) {
    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < winCombinations.length; i++) {
        const [f, s, t] = winCombinations[i];
        if (cells[f] && cells[f] === cells[s] && cells[s] === cells[t]) {
            return [f, s, t]; //winning combination
        }
    }
    if (!cells.includes(null)) {
        return []; //draw
    }
    return null; //continue
}