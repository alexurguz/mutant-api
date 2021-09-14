import { Db } from "mongodb";
import Database from "../../../datasource/database";
import { MongoCollection } from "../../../datasource/database/mongo";
import Respository from "../../../domain/Repository";

export default class GetDnaIfExistsRepository extends Respository<Database<Db>> {
    async exec(dna : string []): Promise<any> {
        let db = await this.dataSource.getConnection();
        const filter = { dna }
        const result = await db.collection(MongoCollection.DNA).findOne(filter);
        return result;
    }
}
