import Respository from "../../../domain/Repository";
import UseCase from "../../../domain/UseCase";

export default class GetStatsUseCase extends UseCase<any> {
    constructor(
        protected repository: Respository<any>
    ) {
        super(repository);
    }
	/**
     * Get stats to know the number of humans and mutants
     * @author johnurbaguz
     * @date 2021-09-11
     * @returns {Promise<any>}
     * @memberof GetStatsUseCase
     */
    async exec(): Promise<any> {
        const stats = await this.repository.exec();
        return stats;
    }
}
