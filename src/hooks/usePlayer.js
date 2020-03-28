//useState will return an array with two items in them, which in this case are player and setPlayer
import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH, checkCollision } from '../gameHelpers';

//Thanks to ES6, we don't have to use whats below: 
    //const playerState = useState();
    //const player = playerState[0]
    //const setPlayer = playerState[1]

//instead we can use what's below    
export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

   //create the updatePlayerPos function that takes in an object(x,y,collided) 
   const updatePlayerPos = ({ x, y, collided }) => {
     //here,  player is moving, so we are setting the state because we are setting player state 
      //In order to achieve this, we need the previous state.
      //we added parenthesis so it won't confuse it for an object
      setPlayer(prev => ({
        ...prev,
        //below, we are adding values to the state. 
        pos: { x: (prev.pos.x += x), y: (prev.pos.y += y)},
        collided,
      }))
    }

    

    //You could actually include both rotate and playerRotate in the same function,
    //but it's best not to because at the end of the day, they will be doing seperate functions. 
    //playerRotate will check the collision when rotating the tetromino.

    //rotate will take in tetromino(matrix) and  direction. We want to rotate the tetromino.
    const rotate = (matrix, dir) => {
      //step one: convert the rows into columns(transpose)
      const rotatedTetro = matrix.map((_,index) => 
        matrix.map(col => col[index]),
        ); 

        //Reverse each row to get a rotated matrix(tetromino)
        //we'll have to seperate into two different things. Becuase it depends what direction youre going. 
        if (dir > 0) return rotatedTetro.map(row => row.reverse())
        return rotatedTetro.reverse();
      };

    const playerRotate = (stage, dir) => {
      //we don't want to mutate anything, so we'll make a copy of player. We'll need to make a deep clone.
      //This makes us not work with a player in the state becuase we shouldn't mutate the state.
      const clonedPlayer = JSON.parse(JSON.stringify(player));

      clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

      const pos = clonedPlayer.pos.x;

      let offset = 1;

      while(checkCollision(clonedPlayer, stage, { x:0, y: 0})) {
        clonedPlayer.pos.x += offset;

        //this creates the ''back and forth movement'' with a tetromino and prevents it
        //from 'bleeding' onto another tetromino
        offset = -(offset + (offset > 0 ? 1 :-1 ))
        if(offset > clonedPlayer.tetromino[0].length) {
          rotate(clonedPlayer.tetromino, -dir);
          clonedPlayer.pos.x = pos;
          return;
        }
      }


      setPlayer(clonedPlayer);

    }
    const resetPlayer = useCallback(() => {
      setPlayer({
        pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
        tetromino: randomTetromino().shape,
        collided: false,
      })
    }, [])
  
    return [player, updatePlayerPos, resetPlayer, playerRotate];
  }
//we are returning the player because we are importing the hook(usePlayer)
//into the tetris component and thrn we are going to need the player 
//in the component 