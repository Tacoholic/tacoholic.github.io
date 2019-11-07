import React, { useState } from 'react';

//This is helping as when starting a new game, this creates a new game 
import { createStage } from '..//gameHelpers';

//components
import StartButton from './StartButton';
import Stage from './Stage';
import Display from './Display';

//style components
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris'; 

//custom hooks

import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

//we'll be adding braces because we will be adding more logic to it. 

const Tetris = () => {
    const[dropTime, setDropTime] = useState(null);
    const[gameOver, setGameOver] = useState(false);

    const[player, updatePlayerPos, resetPlayer] = usePlayer();
    const[stage, setStage] = useStage(player);


console.log('re-render')

const movePlayer = dir => {
    //this makes the left/right movement
    updatePlayerPos({ x: dir, y: 0 });

}

const startGame = () => {
    //reseteverything
    setStage(createStage());
    resetPlayer();
}

const drop = () => {
    //this updates the players position.
    updatePlayerPos({ x: 0, y: 1, collided: false })
}

const dropPlayer = () => {
    drop();
}

//this is going to be the callback function for when you press the keys on the keyboard
const move = ({ keyCode }) => {
    if (!gameOver) {
        if (keyCode === 37) {
            movePlayer(-1);
        } else if (keyCode === 39) {
            movePlayer(1)
        } else if (keyCode === 40) {
            dropPlayer();
        }
    }
}
    return(
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
            <StyledTetris>
            <Stage stage={stage} />
            <aside>
            {gameOver ? (
                <Display gameOver={gameOver} text="Game Over" />
            ) : (
            <div>
                <Display text="Score" />
                <Display text="Rows" />
                <Display text="Level" />
            </div>
            )}
            <StartButton onClick={startGame} />
            </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;