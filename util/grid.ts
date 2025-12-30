import {eightAround} from "../util.ts";

export class Grid<T> {
    private readonly rows: T[][];
    private readonly columns: T[][];

    constructor(rows: T[][]) {
        this.rows = rows;
        this.columns = rows[0].map((_, iCol) => rows.map(row => row[iCol]));
    }

    getRow(i: number) {
        return this.rows[i];
    }

    getCol(i: number) {
        return this.columns[i];
    }

    getItems() {
        return this.rows.flat();
    }

    getItem(iCol: number, iRow: number): T | undefined {
        return this.rows[iRow]?.[iCol];
    }

    setItem(iCol: number, iRow: number, value: T) {
        this.rows[iRow][iCol] = value;
        this.columns[iCol][iRow] = value;
    }

    get rowCount() {
        return this.rows.length;
    }

    get colCount() {
        return this.columns.length;
    }

    get itemCount() {
        return this.colCount * this.rowCount;
    }

    get allRows() {
        return this.rows;
    }

    get allColumns() {
        return this.columns;
    }

    contains(x: number, y: number): boolean {
        return x >= 0 && x < this.colCount
            && y >= 0 && y < this.rowCount;
    }

    eightAroundContained(x: number, y: number): [x: number, y: number][] {
        const around = eightAround(x, y);
        return around.filter(([x, y]) => this.contains(x, y));
    }

    printGrid(mapping?: (item: T, x: number, y: number) => string) {
        const useMapping = !!mapping;
        this.allRows.forEach((row, y) =>
            console.log(row.map((i, x) => useMapping ? mapping(i, x, y) : i).join("")));
    }
}
