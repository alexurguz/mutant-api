import LoadEnv from '../../../src/helpers/LoadEnv';
import Database from '../../../src/datasource/database';
import MongoDatabase from '../../../src/datasource/database/mongo';
import PingRepository from '../../../src/modules/shared/repository/PingRepository';
import PingUseCase from '../../../src/modules/shared/use-case/PingUseCase';

describe('Test stats return data from verifying dna', () => {

    let database: Database<any>;
    let pingRepository: PingRepository;
    let pingUseCase: PingUseCase;

    beforeAll(async() => {
        database = new MongoDatabase();
        await database.connect();
		pingRepository = new PingRepository(database);
        pingUseCase = new PingUseCase(pingRepository);
    });

    test('Verify that there are dna mutant in the database', async () => {
        try {
            // Act
            const result = await pingUseCase.exec();
            // Assert
            expect(result).toEqual(true);
        } catch (error) {
            expect(error).toBeNull();
        }
    });
});
