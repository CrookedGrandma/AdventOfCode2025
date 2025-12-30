import {Handler} from "../handler.ts";
import {compareRanges, mergeRanges, sum} from "../util.ts";

export class H5 extends Handler {
    ranges: RangeT[] = [];
    mergedRanges: RangeT[];

    ids: number[];

    constructor(input: string[]) {
        super(input);
        let i = 0;
        for (let line = input[i]; line !== ""; line = input[++i]) {
            const [from, to] = line.split("-");
            this.ranges.push({from: +from, to: +to});
        }
        this.ranges.sort(compareRanges);
        console.log("total size of all ranges: ..... ", sum(this.ranges.map(r => r.to - r.from + 1)));

        this.mergedRanges = mergeRanges(this.ranges);
        console.log("total size of all merged ranges:", sum(this.mergedRanges.map(r => r.to - r.from + 1)));

        this.ids = input.slice(i + 1).map(l => +l).toSorted((a, b) => a - b);
    }

    runA(input: string[]): Output {
        const fresh = this.ids.filter(id => this.mergedRanges.some(r => id >= r.from && id <= r.to));
        return fresh.length;
    }

    runB(input: string[]): Output | undefined {
        return "just look at the logged size of merged ranges";
    }
}
