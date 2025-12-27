import {Handler} from "../handler.js";

export class H2 extends Handler {
    runA(input: string[]): Output {
        let sum = 0;
        for (let range of input[0].split(",")) {
            const [min, max] = range.split("-");
            const invalid = this.sumInvalidBetween(min, max);
            sum += invalid;
        }
        return [sum];
    }

    runB(input: string[]): Output | undefined {
        let sum = 0;
        for (let range of input[0].split(",")) {
            const [min, max] = range.split("-");
            const invalid = this.sumInvalidBetween2(min, max);
            sum += invalid;
        }
        return [sum];
    }

    sumInvalidBetween(minStr: string, maxStr: string): number {
        const { min, max } = this.validateMinMax(minStr, maxStr);
        if (max < min) {
            return 0;
        }
        minStr = min.toString();

        let sum = 0;
        const attemptHalfStr = minStr.substring(0, minStr.length / 2);
        let attemptHalf = parseInt(attemptHalfStr);
        let attempt = attemptHalf * Math.pow(10, attemptHalfStr.length) + attemptHalf;
        while (attempt <= max) {
            if (attempt >= min) {
                sum += attempt;
            }

            attemptHalf++;
            attempt = attemptHalf * Math.pow(10, attemptHalf.toString().length) + attemptHalf;
        }

        return sum;
    }

    sumInvalidBetween2(minStr: string, maxStr: string): number {
        const min = parseInt(minStr);
        const max = parseInt(maxStr);
        if (max < min) {
            return 0;
        }

        let sum = 0;
        for (let i = min; i <= max; i++) {
            for (let segmentLen = 1; segmentLen <= i.toString().length / 2; segmentLen++) {
                const repetitions = i.toString().length / segmentLen;
                if (!Number.isInteger(repetitions))
                    continue;

                const segment = i.toString().substring(0, segmentLen);
                const attempt = +segment.repeat(repetitions);
                if (attempt == i) {
                    sum += i;
                    break;
                }
            }
        }

        return sum;
    }

    private validateMinMax(minStr: string, maxStr: string) {
        const minEven = minStr.length % 2 == 0;
        const maxEven = maxStr.length % 2 == 0;

        let min = minEven ? parseInt(minStr) : Math.pow(10, minStr.length);
        let max = maxEven ? parseInt(maxStr) : Math.pow(10, maxStr.length - 1) - 1;
        return {min, max};
    }
}