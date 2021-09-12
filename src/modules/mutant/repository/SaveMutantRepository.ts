import { Db } from "mongodb";
import Database from "../../../datasource/database";
import { MongoCollection } from "../../../datasource/database/mongo";
import Respository from "../../../domain/Repository";
import Dna from "../../../domain/models/Dna";

export default class SaveMutantRepository extends Respository<Database<Db>> {
    async exec(dna: Dna): Promise<any> {
        const db = await this.dataSource.getConnection();
        return (await db.collection(MongoCollection.DNA).insertOne(dna)).ops[0];
    }
}
