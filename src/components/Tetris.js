import React from 'react';
import { createStage } from '../gameHelpers';
import StartButton from './StartButton';
import Stage from './Stage';
import Display from './Display';
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris'; 

//we'll be adding braces because we will be adding more logic to it. 

const Tetris = () => {


    return(
        <StyledTetrisWrapper>
            <StyledTetris>
            <Stage stage={createStage()} />
            <aside>
            <div>
                <Display text="Score" />
                <Display text="Rows" />
                <Display text="Level" />
            </div>
            <StartButton />
            </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;