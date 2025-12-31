export abstract class Handler {
    protected input: string[];

    public static readonly TrimInputLines: boolean = true;

    constructor(input: string[]) {
        if (!input.at(-1))
            input.splice(- 1, 1);
        this.input = input;
    }

    abstract runA(input: string[]): Output;
    abstract runB(input: string[]): Output | undefined;
}
