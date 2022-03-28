import React from 'react'
import { useDrop } from 'react-dnd'
import { Cell, cells } from './models'


export const DroppableSection = () => {
    const pairs = []
    for (let x = 0; x < cells.w+1; x++) {
        for (let y = 0; y < cells.h+1; y++) {
            pairs.push([x, y, Math.random()])
        }
    }
    return <>
        {pairs.map(([x, y, key]) => {
            return <DroppableCell key={key} x={x} y={y} />
        })}
    </>
}

export const DroppableCell = ({ x, y }: { x: number, y: number }) => {
    const [, drop] = useDrop(
        () => ({
            accept: 'cell',
            drop: (cell: Cell) => {
                console.log(cell)
                cell.move(x, y)
            },
        }),
        [x, y],
    )
    return <div
        ref={drop}
        onClick={cells.unselect}
        style={{
            gridColumnStart: x,
            gridColumnEnd: x + 1,
            gridRowStart: y,
            gridRowEnd: y + 1,
            backgroundColor: 'transparent',
            border: "1px solid black",
            zIndex: 2,
        }}>
    </div>
}