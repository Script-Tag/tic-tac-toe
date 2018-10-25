import React from 'react';
import Board from '../board/Board';
import { calculateWinner, isNewUserTurnExists } from '../helper'

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
        let isPicked = this.state.isPicked;
        
        if (isPicked && previousVal === squares[i]) {
            console.log("You have already picked");
            return ;
        }
        else if (previousVal === squares[i] ) {
            squares[i] = null;
            xIsNext = this.state.xIsNext;
            isPicked = true;
            console.log("PREVIOUS");
        }
        else if(previousVal) {
            console.log(`It's ${previousVal} square.` );
            return ;
        }
        else if (isNewUserTurnExists(squares[i], squares)) {
                console.log("New User Turn Exists");
            return ;
        }
        else {
            isPicked = false;
            console.log("ELSE");
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
                <div className="">
                    <div className="status">{status}</div>
                    <div></div>
                    <ol></ol>
                </div>
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
            </div>
        );
    }
}

export default Game;