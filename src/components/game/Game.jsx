import React from 'react';
import Board from '../board/Board';

class Game extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            history:[{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            isPicked: false
        };
    }

    handleClick(i){
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares)) {
            return ;
        }

        let previousVal = squares[i];
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        let xIsNext = !this.state.xIsNext;
        let isPicked = false;

        if (isNewUserTurnExists(squares[i], squares)) {
            return ;
        }
        else if (isPicked && previousVal === squares[i]) {
            console.log("You have already picked");
            return ;
        }
        else if (previousVal === squares[i]) {
            squares[i] = null;
            xIsNext = this.state.xIsNext;
            isPicked = true;
        }
        else if(previousVal) {
            console.log(`It's ${previousVal} square.` );
            return ;
        }

        this.setState({
            history: history.concat([{
              squares: squares
            }]),
            xIsNext: xIsNext,
            isPicked: isPicked
        });
    }

    render(){

        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = 'Winner Player : ' + winner;
        }
        else {
            status = 'Next Player : ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                <div className="status">{status}</div>
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div></div>
                    <ol></ol>
                </div>
            </div>
        );
    }
}


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for(let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}

function isNewUserTurnExists(user, squares){

    let counter = 0;

    for(let i = 0; i<squares.length; i++) {
        if (squares[i] === user) {
            counter ++;
        }

        if (counter > 3) {
            return true;
        }
    }

    return false;
}

export default Game;