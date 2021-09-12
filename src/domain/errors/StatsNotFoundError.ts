import ApiError from "./ApiError";

export default class StatsNotFoundError extends ApiError {
    constructor(public cause: Error | null = null) {
        super(`Stats not found `, 404, cause);
    }
}
