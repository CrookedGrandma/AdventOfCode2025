import {Handler} from "../handler.js";

export class H1 extends Handler {
    runA(input: string[]): Output {
        return [this.simulate(50, 0, 99, i => i == 0)];
    }

    runB(input: string[]): Output | undefined {
        return [this.simulate2()];
    }

    simulate(start: number, min: number, max: number, countIfTrue: (i: number) => boolean): number {
        let count = 0;
        const range = max - min + 1;

        let position = start;
        for (let line of this.input) {
            const direction = line[0] == "L" ? -1 : 1;
            const distance = parseInt(line.substring(1));

            position += direction * distance;
            while (position < min) {
                position += range;
            }
            while (position > max) {
                position -= range;
            }

            if (countIfTrue(position)) {
                count++;
            }
        }

        return count;
    }

    simulate2(): number {
        let count = 0;

        let position = 50, lastPosition = 50;
        for (let line of this.input) {
            const direction = line[0] == "L" ? -1 : 1;
            const distance = parseInt(line.substring(1));

            position += direction * distance;
            let wasAt100 = false;
            let skippedFirst0 = false;
            while (position < 0) {
                position += 100;
                if (!skippedFirst0 && lastPosition == 0) {
                    skippedFirst0 = true;
                }
                else {
                    count++;
                }
            }
            while (position > 99) {
                if (position == 100) {
                    wasAt100 = true;
                }
                position -= 100;
                count++;
            }
            if (!wasAt100 && position == 0) {
                count++;
            }

            lastPosition = position;
        }

        return count;
    }
}