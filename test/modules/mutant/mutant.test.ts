import LoadEnv from '../../../src/helpers/LoadEnv';
import Database from '../../../src/datasource/database';
import MongoDatabase from '../../../src/datasource/database/mongo';
import SaveMutantRepository from '../../../src/modules/mutant/repository/SaveMutantRepository';
import VerifyMutantUseCase from '../../../src/modules/mutant/use-case/VerifyMutantUseCase';
import GetDnaIfExistsRepository from '../../../src/modules/mutant/repository/GetDnaIfExistsRepository';
import GetDnaIfExistsUseCase from '../../../src/modules/mutant/use-case/GetDnaIfExistsUseCase';

describe('Test verifying is dna is mutant or not', () => {

    let database: Database<any>;
    let saveMutantRepository: SaveMutantRepository;
    let verifyMutantUseCase: VerifyMutantUseCase;
    let getDnaIfExistsRepository: GetDnaIfExistsRepository;
    let getDnaIfExistsUseCase: GetDnaIfExistsUseCase;

    beforeAll(async() => {
        database = new MongoDatabase();
        await database.connect();
		getDnaIfExistsRepository = new GetDnaIfExistsRepository(database);
        getDnaIfExistsUseCase = new GetDnaIfExistsUseCase(getDnaIfExistsRepository);
        saveMutantRepository = new SaveMutantRepository(database);
        verifyMutantUseCase = new VerifyMutantUseCase(saveMutantRepository, getDnaIfExistsUseCase);
    });

    test('The dna strig is mutant', async () => {
        try {
            const dna = {
				dna: ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","ACACTG"],
				isMutant: false
            }
            // Act
            const result = await verifyMutantUseCase.exec(dna);
            // Assert
            expect(result.isMutant).toEqual(true);
        } catch (error) {
            expect(error).toBeNull();
        }
    });

	test('The dna strig is not mutant', async () => {
        try {
            const dna = {
				dna: ["ATGCGA","CAGTGC","TTATTT","AGACGC","GCGTCA","TCACTG"],
				isMutant: false
            }
            // Act
            const result = await verifyMutantUseCase.exec(dna);
            // Assert
            expect(result.isMutant).toEqual(false);
        } catch (error) {
            expect(error).toBeNull();
        }
    });

});
