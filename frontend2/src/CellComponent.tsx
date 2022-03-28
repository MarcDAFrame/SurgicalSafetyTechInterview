import { observer } from 'mobx-react';
import React from 'react'
import { useDrag } from 'react-dnd';
import { Cell, cells } from "./models";

export const CellComponent = observer(({ cell }: { cell: Cell }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'cell',
        item: cell,
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))
    cell.dims
    return <div className="cell" 
    ref={drag}
    onClick={cells.select(cell)}
    style={{
        gridColumnStart: cell.x,
        gridColumnEnd: cell.w + cell.x,
        gridRowStart: cell.y,
        gridRowEnd: cell.h + cell.y,
        backgroundColor: 'green',
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1: 2,
    }}>

    </div>
})