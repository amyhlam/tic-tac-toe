import React from 'react';
import { Box } from "./Box";


export const Board = ({ board, onClick }) => {
    return (
        <div className="board">
            {board.map((value, idx) => {
                // onClick(idx) gives the index of the box that has been clicked
                // value === null prevents user from being able to click a box that is already filled 
                return <Box value={value} onClick={() => value === null && onClick(idx)} />
            })}
        </div>
    )
}