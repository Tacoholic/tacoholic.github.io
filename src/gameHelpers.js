export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 30;


export const createStage = () => 

Array.from(Array(STAGE_HEIGHT), () => 
    new Array(STAGE_WIDTH).fill([0, 'clear'])
)
//You need to create a function what will set the stage. 
//This multi-dimenstional or nested array array creates the Grid - it represents rows and columns. 
//You need to create an Array from something. That other something is Array(Stage_Height)
//So far Line 7 Array.from(Array(STAGE_HEIGHT) is not useful because it is empty, so we have to fill it up with something. So,
//you then add an inline function that will create a new array with cells and we are fillwing them up with '0' and 'clear'.
//It has a value that is 0 and represents that is nothing in that cell in the stage. We also have a string ('clear'), which means that there is 
//no tetra minor that has collided in the cell and we should wipe it out from the stage in the next render. 

//