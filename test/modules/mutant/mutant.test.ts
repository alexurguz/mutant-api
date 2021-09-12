const supertest = require('supertest');
import LoadEnv from '../../../src/helpers/LoadEnv';
import Database from '../../../src/datasource/database';
import MongoDatabase from '../../../src/datasource/database/mongo';
import Server from '../../../src/Server';

test('Authorization is success when data is correct', async () => {
	try {
		let database : Database<any>;
		database = new MongoDatabase();
		await database.connect();
		const server = await new Server(database);
		(async () => {
			await server.start();
		})();
		const api = supertest(server.getApp());

		api
        .get('/ping')
        .expect(200)
	} catch (error) {
		expect(error).toBeNull();
	}
});