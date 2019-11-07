//useEffect creates side effects with React, replaces lifecycle methods in cask components
import { useState, useEffect } from 'react';

import { createStage } from '../gameHelpers';
import { rootCertificates } from 'tls';


//We'll be taking in player and resetPlayer as our parameters
export const useStage  = ( player, resetPlayer ) => {
                              //this generates a clean board 
    const [stage, setStage] = useState(createStage())

    useEffect(() => {
        const updateStage = prevStage => {
            //First flush the stage
            const newStage = prevStage.map(row => 
                row.map(cell => (cell[1] === 'clear' ? [0,'clear'] : cell )),
                );
                //then draw the tetromino
                player.tetromino.forEach((row, y) => {
                    row.forEach((value, x) => {
                        if (value !== 0){
                            newStage[y + player.pos.y][x + player.pos.x] = [
                                value,
                                `${player.collided ? 'merged': 'clear'}`
                            ]
                        }
                    })
                });
                return newStage;
        };
        setStage(prev => updateStage(prev))
    }, [player.collided, player.pos.x, player.pos.y, player.tetromino]);

    return[stage, setStage];
}