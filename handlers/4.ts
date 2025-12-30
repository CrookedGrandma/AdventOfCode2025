import {Handler} from "../handler.ts";
import {Grid} from "../util/grid.ts";
import {sum} from "../util.ts";

export class H4 extends Handler {
    grid: Grid<boolean>;

    constructor(input: string[]) {
        super(input);
        const rolls: boolean[][] = input
            .map(line => line.split("")
                .map(tile => tile === "@"));
        this.grid = new Grid(rolls);
    }

    runA(input: string[]): Output {
        return this.countReachableRolls((x, y) => this.isReachable(x, y));
    }

    runB(input: string[]): Output | undefined {
        let sum = 0;
        let reachableSpaces: Position[] = [];
        do {
            sum += reachableSpaces.length;
            for (let space of reachableSpaces) {
                this.grid.setItem(space.x, space.y, false);
            }
            reachableSpaces = [];
            for (let y = 0; y < this.grid.rowCount; y++) {
                const row = this.grid.getRow(y);
                for (let x = 0; x < this.grid.colCount; x++) {
                    const isRoll = row[x];
                    if (isRoll && this.isReachable(x, y)) {
                        reachableSpaces.push({x, y});
                    }
                }
            }
        }
        while (reachableSpaces.length > 0);
        return sum;
    }

    countReachableRolls(isReachable: (x: number, y: number) => boolean): number {
        const reachablePerRow = this.grid.allRows.map((row, y) =>
            sum(row.map((isRoll, x) => {
                    if (!isRoll)
                        return 0;

                    return isReachable(x, y) ? 1 : 0;
                })
            ));
        return sum(reachablePerRow);
    }

    isReachable(x: number, y: number) {
        return this.grid.eightAroundContained(x, y)
            .filter(([x, y]) => this.grid.getItem(x, y))
            .length < 4;
    }
}
