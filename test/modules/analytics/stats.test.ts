import LoadEnv from '../../../src/helpers/LoadEnv';
import Database from '../../../src/datasource/database';
import MongoDatabase from '../../../src/datasource/database/mongo';
import SaveMutantRepository from '../../../src/modules/mutant/repository/SaveMutantRepository';
import VerifyMutantUseCase from '../../../src/modules/mutant/use-case/VerifyMutantUseCase';
import GetDnaIfExistsRepository from '../../../src/modules/mutant/repository/GetDnaIfExistsRepository';
import GetDnaIfExistsUseCase from '../../../src/modules/mutant/use-case/GetDnaIfExistsUseCase';
import GetStatsRepository from '../../../src/modules/analytics/repository/GetStatsRepository';
import GetStatsUseCase from '../../../src/modules/analytics/use-case/GetStatsUseCase';

describe('Test stats return data from verifying dna', () => {

    let database: Database<any>;
    let saveMutantRepository: SaveMutantRepository;
    let verifyMutantUseCase: VerifyMutantUseCase;
    let getDnaIfExistsRepository: GetDnaIfExistsRepository;
    let getDnaIfExistsUseCase: GetDnaIfExistsUseCase;
    let getStatsRepository: GetStatsRepository;
    let getStatsUseCase: GetStatsUseCase;

    beforeAll(async() => {
        database = new MongoDatabase();
        await database.connect();
		getDnaIfExistsRepository = new GetDnaIfExistsRepository(database);
        getDnaIfExistsUseCase = new GetDnaIfExistsUseCase(getDnaIfExistsRepository);
        saveMutantRepository = new SaveMutantRepository(database);
        verifyMutantUseCase = new VerifyMutantUseCase(saveMutantRepository, getDnaIfExistsUseCase);
		getStatsRepository = new GetStatsRepository(database);
        getStatsUseCase = new GetStatsUseCase(getStatsRepository);

		let dna = {
			dna: ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","ACACTG"],
			isMutant: false
		}
		await verifyMutantUseCase.exec(dna);
		dna = {
			dna: ["ACGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","ACACTG"],
			isMutant: false
		}
		await verifyMutantUseCase.exec(dna);
    });

    test('Verify that there are dna mutant in the database', async () => {
        try {
            // Act
            const result = await getStatsUseCase.exec();
            // Assert
            expect((result.count_mutant_dna >= 2)).toBeTruthy();
        } catch (error) {
            expect(error).toBeNull();
        }
    });
});
