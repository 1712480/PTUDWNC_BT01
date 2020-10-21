import React, { useState } from "react";

import Board from "../../components/board/Board";
import { notify } from '../../components/toast/Toast';

import { calculateWinner } from './Game.util';
import './Game.css';
import HistoryButton from "../../components/historyButton/HistoryButton";

const initialState = {
    history: [{
        squares: Array(9).fill(null),
    }],
    stepNumber: 0,
    xIsNext: true
}

const Game = () => {
    const [gameState, setGameState] = useState(initialState);

    const handleClick = i => {
        const { history, stepNumber, xIsNext } = gameState;
        const currentHistory = history.slice(0, stepNumber + 1);
        const current = currentHistory[currentHistory.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares || squares[i])) {
            return;
        }

        if (squares[i] !== null) {
            notify.warning('Can not make new move on this square!');
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';
        setGameState({
            history: currentHistory.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !xIsNext,
        });
    }

    const jumpTo = step => {
        notify.success(`Jumped to move #${step}`)
        setGameState({
            ...gameState,
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    const { history, stepNumber } = gameState;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
        const desc = move ?
            `Go to move #${move}` :
            'Go to game start';
        return (
            <HistoryButton
                key={move}
                onClick={() => jumpTo(move)}
                description={desc}
                move={move}
            />
        );
    });


    let status;
    if (winner) {
        notify.success(`Winner: ${winner}`);
        status = `End game.`;
    } else {
        status = `Next player: ${gameState.xIsNext ? 'X' : 'O'}`;
    }

    return (
        <div>
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
            {winner || gameState.history.length === 10 ? <button className="reset-button" onClick={() => setGameState(initialState)}>Play again!</button> : ''}
        </div>
    );
}

export default Game;
