import React from 'react'
import './App.css'
import { CellComponent } from './CellComponent'
import { Cell, cells } from './models'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DroppableSection } from './DroppableSection'
import { observer } from 'mobx-react'
import { CellForm } from './Form'

const App = observer(() => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div id="cells" style={{
        gridTemplateColumns: `repeat(${cells.w}, 1fr)`,
        gridTemplateRows: `repeat(${cells.h}, 1fr)`,
        overflow: "hidden",
      }}>
        <DroppableSection/>
        {cells.cells.map((cell: Cell) => (
          <CellComponent key={cell.id} cell={cell} />
        ))}
      </div>
      <div id="toolbox">
        {/* {cells.selected?.id} */}
          <CellForm/>
          {/* <button onClick={cells.unselect}> 
            Unselect
          </button> */}
      </div>
    </DndProvider>

  )
})

export default App
