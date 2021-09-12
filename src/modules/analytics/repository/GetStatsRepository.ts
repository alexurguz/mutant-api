import { Db } from "mongodb";
import Database from "../../../datasource/database";
import { MongoCollection } from "../../../datasource/database/mongo";
import Respository from "../../../domain/Repository";

export default class GetStatsRepository extends Respository<Database<Db>> {
    async exec(): Promise<any> {
        let db = await this.dataSource.getConnection();
        const mutants = await db.collection(MongoCollection.DNA).find({ isMutant: true }).count();
		const humans = await db.collection(MongoCollection.DNA).find({ isMutant: false }).count();
		const ratio = (humans ? (mutants / humans): 0).toFixed(1);

		const result = {
			count_mutant_dna: mutants,
			count_human_dna: humans,
			ratio,
		}
        return result;
    }
}
