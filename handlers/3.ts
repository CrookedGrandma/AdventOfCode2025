import {Handler} from "../handler.ts";
import {Grid} from "../util/grid.ts";
import {sum} from "../util.ts";

export class H3 extends Handler {
    grid: Grid<number>;

    constructor(input: string[]) {
        super(input);
        this.grid = new Grid<number>(input.map(line => line.split("").map(i => +i)));
    }

    runA(input: string[]): Output {
        const bankValues = this.grid.allRows.map(this.maxValue);
        return sum(bankValues);
    }

    runB(input: string[]): Output | undefined {
        const bankValueArrays: number[][] = this.grid.allRows.map(r => this.maxValueRecur(r, 12));
        const bankValues: number[] = bankValueArrays.map(vs => +vs.join(""));
        return sum(bankValues);
    }

    maxValue(bank: number[]): number {
        let max = Math.max(...bank);
        let iMax = bank.indexOf(max);
        if (iMax == bank.length - 1) {
            max = Math.max(...(bank.slice(0, -1)))
            iMax = bank.indexOf(max);
        }
        const max2 = Math.max(...(bank.slice(iMax + 1)));
        return +`${max}${max2}`;
    }

    maxValueRecur(bank: number[], toSelect: number): number[] {
        if (toSelect < 1)
            return [];
        const sliceEnd = toSelect === 1 ? undefined : -(toSelect - 1);
        const searchSlice = bank.slice(0, sliceEnd);
        const max = Math.max(...searchSlice);
        const iMax = bank.indexOf(max);
        const nextSlice = bank.slice(iMax + 1);
        return [max, ...this.maxValueRecur(nextSlice, toSelect - 1)];
    }
}