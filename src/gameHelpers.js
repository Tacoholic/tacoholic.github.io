export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 'clear']),
  );
//You need to create a function what will set the stage. 
//This multi-dimenstional or nested array array creates the Grid - it represents rows and columns. 
//You need to create an Array from something. That other something is Array(Stage_Height)
//So far Line 7 Array.from(Array(STAGE_HEIGHT) is not useful because it is empty, so we have to fill it up with something. So,
//you then add an inline function that will create a new array with cells and we are fillwing them up with '0' and 'clear'.
//It has a value that is 0 and represents that is nothing in that cell in the stage. We also have a string ('clear'), which means that there is 
//no tetra minor that has collided in the cell and we should wipe it out from the stage in the next render. 

//

//We are entering an object and renaming x (moveX) and y (moveY)
//This is being done because we are using x and y in our loops and would like to have a different name
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
     
      //1.lets check if we are actually on a tetromino cell
      //Line 26 lets us know if we are on a actual cell that makes up the tetrominor
      if (player.tetromino[y][x] !== 0) {
        if(
        //2.lets check that our move is inside the game areas height (y)
          //We should not go through the bottom of the play area 
        !stage[y + player.pos.y + moveY] ||
        //3.Check that tetriminor move is inside of the game areas width (x)
        !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
        //4.Check that cell we're moving to isn't set to clear
        stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
        ) {
          return true;
        }
      }
    }
  }
};