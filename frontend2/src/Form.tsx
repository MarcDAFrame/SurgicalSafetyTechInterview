import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { Cell, cells, dims_i } from './models'


export const BaseCellForm = observer(({ cell, onSubmit, errmsg }: { cell: Cell, onSubmit: (dims: dims_i) => void, errmsg?: string  }) => {
    console.log("RERENDER", cell)

    const [newX, setNewX] = React.useState(cell.x)
    const [newY, setNewY] = React.useState(cell.y)
    const [newW, setNewW] = React.useState(cell.w)
    const [newH, setNewH] = React.useState(cell.h)
    useEffect(() => {
        setNewX(cell.x)
        setNewY(cell.y)
        setNewW(cell.w)
        setNewH(cell.h)
    }, [cell])
    return <div>

        <label>
            Box X:
            <input value={newX} onChange={(e) => setNewX(Number(e.target.value))} />
        </label>
        <label>
            Box Y:
            <input value={newY} onChange={(e) => setNewY(Number(e.target.value))} />
        </label>
        <label>
            Box Width:
            <input value={newW} onChange={(e) => setNewW(Number(e.target.value))} />
        </label>
        <label>
            Box Height:
            <input value={newH} onChange={(e) => setNewH(Number(e.target.value))} />
        </label>
        <button onClick={() => onSubmit({ x: newX, y: newY, w: newW, h: newH })}>
            Submit
        </button>
        <div id="error">
            {errmsg}
        </div>
    </div>
})

export const CellForm = observer(() => {
    console.log("SELECTED", cells.selected)
    const [errmsg, setErrmsg] = React.useState<undefined|string>()
    if (cells.selected) {
        const cell = cells.selected
        return <BaseCellForm cell={cell} errmsg={errmsg} onSubmit={(dims) => {
            console.log('edit')
            const msg = cell.updateCell(dims)
            setErrmsg(msg)
        }} />
    }

    const cell = new Cell(cells, { x: 1, y: 1, h: 1, w: 1 })
    return <BaseCellForm cell={cell} errmsg={errmsg} onSubmit={(dims) => {
        console.log('create')
        const msg = cells.addCell(dims)
        console.log(msg)
        setErrmsg(msg)
    }} />
})