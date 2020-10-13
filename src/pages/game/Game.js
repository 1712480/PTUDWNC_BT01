import React from "react";

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

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares || squares[i])) {
            return;
        }
        if (squares[i] !== null) {
            notify.warning('Can not make new move on this square!');
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        notify.success(`Jumped to move #${step}`)
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                `Go to move #${move}` :
                'Go to game start';
            return (
                <HistoryButton
                    key={move}
                    onClick={() => this.jumpTo(move)}
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
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div>
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        <div className="status">{status}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
                {winner ? <button className="reset-button" onClick={() => this.setState(initialState)}>Play again!</button> : ''}
            </div>
        );
    }
}

export default Game;
