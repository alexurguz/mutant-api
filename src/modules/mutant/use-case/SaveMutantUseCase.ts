import Respository from "../../../domain/Repository";
import UseCase from "../../../domain/UseCase";
import Dna from "../../../domain/models/Dna";
import GetDnaIfExistsUseCase from './GetDnaIfExistsUseCase';
import DnaExistError from '../../../domain/errors/DnaExistError';

export default class SaveMutantUseCase extends UseCase<any> {
    constructor(
        protected repository: Respository<any>,
        private getDnaIfExistsUseCase: GetDnaIfExistsUseCase
    ) {
        super(repository);
    }

    /**
     * Insert a dna into the dna collection
     * @author johnurbaguz
     * @date 2021-09-11
     * @param {object} dnaData - A object of dna to register.
     * @returns {Promise<any>}
     * @memberof SaveMutantUseCase
     */
    async exec(dnaData : Dna): Promise<any> {
        const dna = await this.getDnaIfExistsUseCase.exec(dnaData.dna);
		console.log('dna::', JSON.stringify(dna));
        if (dna) {
            throw new DnaExistError(dnaData.dna);
        }
        await this.repository.exec(dnaData);
        return dnaData;
    }
}