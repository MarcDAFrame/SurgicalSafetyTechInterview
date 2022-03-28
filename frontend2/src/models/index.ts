import { makeAutoObservable } from "mobx"

export interface dims_i {
    x: number
    y: number
    w: number
    h: number
}
export class Cells {
    cells: Cell[] = []
    selected?: Cell
    constructor(public w: number, public h: number) {
        makeAutoObservable(this)
    }

    addCell = (dims: dims_i) => {
        const newCell = new Cell(this, dims)
        console.log(newCell, this.intersects(newCell))
        if (this.intersects(newCell)) {
            return "the new cell intersects with current cells"
        }
        this.cells.push(newCell)
    }

    intersects = (cell: Cell) => {
        /**
         * returns true if the cell intersects with another cell
         */
        for (const other of this.cells) {
            if (other.id == cell.id) continue
            if (other.intersects(cell) ) { //|| cell.intersects(other)
                return true
            }
        }
        return false
    }

    select = (cell: Cell) => {
        return () => {
            if (this.selected?.id == cell.id) {
                return this.unselect()
            }
            this.selected = cell
        };
    }
    unselect = () => {
        this.selected = undefined
    }
}


export class Cell {
    id: number
    constructor(public cells: Cells, public dims: dims_i) {
        this.id = Math.random()
        makeAutoObservable(this)
    }

    removeCell = () => {
        /**
         * remove cell from this.cells.cells
         */
    }
    updateCell = (dims: dims_i) => {
        const newCell = new Cell(this.cells, dims)
        newCell.id = this.id
        if (this.cells.intersects(newCell)) {
            return "the updated cell intersects with other cells"
        }
        this.dims = dims
    }
    canMove = (x: number, y: number) => {
        const newCell = new Cell(this.cells, { x, y, w: this.w, h: this.h })
        newCell.id = this.id
        return !this.cells.intersects(newCell)
    }

    move = (x: number, y: number) => {
        /**
         * check if this.cells.intersects(this)
         * 
         * handles moving cells as well
         */
        if (this.canMove(x, y)) {
            this.dims.x = x
            this.dims.y = y
        }
    }

    intersects = (other: Cell) => {
        // console.log(other.x, other.y, other.x2, other.y2, '---', this.x, this.y, this.x2, this.y2)
        if (this.y > other.y2 || other.y > this.y2) {
            return false;
        }
        if (this.x2 < other.x || other.x2 < this.x) {
            return false;
        }
        return true;
    }

    get x() {
        return this.dims.x
    }
    get x2() {
        return this.x + this.w
    }
    get y() {
        return this.dims.y
    }
    get y2() {
        return this.y + this.h
    }
    get w() {
        return this.dims.w
    }
    get h() {
        return this.dims.h
    }
}

export const cells = new Cells(20, 20)

cells.addCell({ x: 1, y: 1, w: 5, h: 5 })
cells.addCell({ x: 10, y: 10, w: 5, h: 5 })