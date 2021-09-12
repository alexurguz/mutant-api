import ApiError from "./ApiError";

export default class DnaExistError extends ApiError {
    constructor(dna: string [], cause: Error | null = null) {
        super(`Dna already exist ${dna}`, 400, cause);
    }
}
