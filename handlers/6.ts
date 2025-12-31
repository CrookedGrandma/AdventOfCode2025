import {Handler} from "../handler.ts";
import {distinct, product, sum} from "../util.ts";
import {Grid} from "../util/grid.ts";

export class H6 extends Handler {
    numberCols: number[][] = [];
    operators: string[];

    public static readonly TrimInputLines = false;

    constructor(input: string[]) {
        super(input);
        for (let line of input.slice(0, -1)) {
            const split = line.split(/\s+/).filter(Boolean).map(n => +n);
            split.forEach((number, i) => {
                if (this.numberCols.length <= i)
                    this.numberCols.push([]);
                this.numberCols[i].push(number);
            });
        }
        const opLine = input.at(-1)!;
        this.operators = opLine.split(/\s+/).filter(Boolean);
    }

    runA(input: string[]): Output {
        const results = this.numberCols.map((numbers, i) =>
            this.operators[i] == "+" ? sum(numbers) : product(numbers));
        return sum(results);
    }

    runB(input: string[]): Output | undefined {
        const splitLines = input.slice(0, -1).map(line => line.split(""));
        const grid = new Grid<string>(splitLines);

        const problems: string[][][] = [];
        let newProblem: string[][] = [];
        for (let x = 0; x < grid.colCount; x++) {
            const col = grid.getCol(x);
            const distinctInCol = distinct(col);
            if (x === grid.colCount - 1) {
                newProblem.push(col);
                problems.push(newProblem);
            } else if (distinctInCol.length === 1 && distinctInCol[0] === " ") {
                problems.push(newProblem);
                newProblem = [];
            } else {
                newProblem.push(col);
            }
        }

        let total = 0;

        for (let i = 0; i < problems.length; i++) {
            const problem = problems[i];
            const operator = this.operators[i];
            const numbers = problem.map(col => +col.join(""));
            const result = operator === "+" ? sum(numbers) : product(numbers);
            total += result;
        }

        return total;
    }
}