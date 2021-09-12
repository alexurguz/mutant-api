import Respository from "../../../domain/Repository";
import UseCase from "../../../domain/UseCase";

export default class GetDnaIfExistsUseCase extends UseCase<any> {
    constructor(
        protected repository: Respository<any>
    ) {
        super(repository);
    }
	/**
     * Get a dna from dna collection
     * @author johnurbaguz
     * @date 2021-09-11
     * @param {object} dnaData - A array with the dna to get.
     * @returns {Promise<any>}
     * @memberof GetDnaIfExistsUseCase
     */
    async exec(dnaData: string []): Promise<any> {
        const dna = await this.repository.exec(dnaData);
        return dna;
    }
}
