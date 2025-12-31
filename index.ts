import fs from "node:fs";
import {Handler} from "./handler.ts";

const USE_EXAMPLE = false;

const handlerNames = fs.readdirSync("handlers/").sort((a, b) => +a - +b);
if (handlerNames.length === 0)
    throw new Error("No handlers found");
const latestHandlerName = handlerNames.at(-1)!;
const handlerNumber = latestHandlerName.split(".")[0] + (USE_EXAMPLE ? "E" : "");

console.log(`CHALLENGE NUMBER: ${handlerNumber}\n`);

const input = fs.readFileSync(`input/${handlerNumber}.txt`).toString().split("\n");
const trimmedInput = input.map(l => l.trim());

console.log("constructing...\n")
const foundClass = Object.values(await import(`./handlers/${latestHandlerName}`))[0] as (new(input: string[]) => Handler) & typeof Handler;
const handler = new foundClass(foundClass.TrimInputLines ? trimmedInput : input);

console.log("\nstarting...\n")
const outputA = handler.runA(input);
write(outputA, true);

const outputB = handler.runB(input);
if (outputB) {
    write("\n\n========== SECOND TASK ==========\n\n");
    write(outputB);
}

function write(output: Output, overwrite: boolean = false): void {
    const flags = overwrite ? undefined : { flag: "a" };
    let print: string = Array.isArray(output) ? output.join("\n") : output.toString();
    fs.writeFileSync(`output/${handlerNumber}.txt`, print, flags);
    console.log(print);
}
