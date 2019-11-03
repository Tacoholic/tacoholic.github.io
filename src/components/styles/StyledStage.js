import style from 'styled-components';

//We are using back ticks because it is a type of function!
// the props => props.width is a calculation that will create a nice grid for us. This also keeps the aspect ratio of the grid cells.

export const StyleStage = style.div`
    display: grid;
    grif-template-rows: repeat(
        ${props => props.height},
        calc(25vw / ${props => props.width})
    );
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 1px;
    border: 2px solid #333;
    width: 100%;
    max-width: 25vw;
    background: #111;
`;