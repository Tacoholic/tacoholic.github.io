//useEffect creates side effects with React, replaces lifecycle methods in class components
import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';



//We'll be taking in player and resetPlayer as our parameters
export const useStage = (player, resetPlayer) => {
        //this generates a clean board 
    const [stage, setStage] = useState(createStage());
    //this will clear the rows
    const [rowsCleared, setRowsCleared] = useState(0);  

    //we are creating useEffect for everything related to the effect
    useEffect(() => {

        setRowsCleared(0);
        const sweepRows = newStage => 
        //reduce is ES6
        //by using reduce method, you can create a new array 
            newStage.reduce((ack, row) => {
                //this will check if a row  has any zeros.
                //if it does, we now that it shuoldn't be cleared because we havent' filled up a complete row. 
                //we will check if the first value in cell equals to zero
                //will also check to see if also equals to -1.  If it isn't, its a full row and it shuold be clear
                if (row.findIndex(cell => cell[0] === 0) === -1){
                    //If a row is cleared up, we add a row to rows Cleared state. 
                    setRowsCleared(prev => prev + 1);
                    //the code below provides a new row to the top of the array 
                    ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return ack;
                }
                //if we dont' have a full rull, we return it as is. 
                ack.push(row);
                return ack;
            }, [])
        //add another function  
        const updateStage = prevStage => {
            //First flush the stage or clear it from previous render 
            //we are gonna take the prevStage and then map through it 
            const newStage = prevStage.map(row =>
                //Because we have a multidimensional array, we have to map another array
                //the value of cell[1] we are grabbing it from gamehelper.js
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
                );
                //then draw the tetromino by loopinh through 
                player.tetromino.forEach((row, y) => {
                    //becuase there is a multidimensionall array,we'll be doing another loop
                    //This will check which cells are occupied so we know the next shape of the
                    //tetromino
                    row.forEach((value, x) => {
                        //if value isnt zero, then we know we are on a cell
                        //that makes the shape of the tetromino and we know how to poistion
                        //the tetromino on the stage
                        if (value !== 0) {
                            //because this is a multidemonsional array, we have to set the y and x value for newSatge
                            //this will give us the coordinates on the stage. 
                            newStage[y + player.pos.y][x + player.pos.x] = [
                                //value is the tetromino we are looping through 
                                value,
                                //below we are going to check if player has collided
                                `${player.collided ? 'merged' : 'clear'}`,
                            ];
                        }
                    });
                });
                //this checks if we collided 
                if (player.collided) {
                    resetPlayer();
                    return sweepRows(newStage);
                  }
                return newStage;
        };
        setStage(prev => updateStage(prev));
        //these are the dependencies, that we are using inside useEffect and why we are labeling them before.
    }, [player, resetPlayer, rowsCleared]);

    return [stage, setStage];
};