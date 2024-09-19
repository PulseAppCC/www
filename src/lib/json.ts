import { isInteger, parse } from "lossless-json";

/**
 * Parse the given input as JSON.
 *
 * @param input the input to parse
 */
export const parseJson = (input: string): any =>
    parse(input, null, (value: string): string | number =>
        isInteger(value) ? String(value) : parseInt(value)
    );
