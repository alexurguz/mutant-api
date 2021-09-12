import Respository from "../../../domain/Repository";
import UseCase from "../../../domain/UseCase";
import Dna from "../../../domain/models/Dna";
const { isMutant } = require("../../../service/isMutantService");
import Constants from '../../../helpers/Constants';
import GetDnaIfExistsUseCase from './GetDnaIfExistsUseCase';

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

		const isMutante = await isMutant(dnaData.dna, Constants.NITROGENOUS_BASE_STRINGS, Constants.SEQ_SIZE, Constants.MAX_NUM_SEQ);
		dnaData.isMutant = isMutante
        const dna = await this.getDnaIfExistsUseCase.exec(dnaData.dna);
        if (!dna) {
            await this.repository.exec(dnaData);
        }
        return dnaData;
    }
}