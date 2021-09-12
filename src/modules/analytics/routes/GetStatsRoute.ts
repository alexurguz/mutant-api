import Server from '../../../Server';
import * as express from 'express';
import IRoute from '../../../domain/IRoute';
import Database from '../../../datasource/database';
import GetStatsRepository from '../repository/GetStatsRepository';
import GetStatsUseCase from '../use-case/GetStatsUseCase';
import ApiError from '../../../domain/errors/ApiError';
import Stat from "../../../domain/models/Stat";
import StatSerializer from "../../../domain/serializers/StatsSerializer";
import StatsNotFoundError from "../../../domain/errors/StatsNotFoundError"

export default class GetStatsRoute implements IRoute {
    async register(server: Server, database: Database<any>): Promise<any> {

        const getStatsRepository = new GetStatsRepository(database);
        const getStatsUseCase = new GetStatsUseCase(getStatsRepository);

        server.getApp()?.get('/stats/', async (req: express.Request, res: express.Response) => {
            try {

                const stat: Stat = await getStatsUseCase.exec();
				if (stat.count_mutant_dna == 0 && stat.count_human_dna == 0){
					throw new StatsNotFoundError();
				}
				const statSerializer: StatSerializer = new StatSerializer(stat.count_mutant_dna, stat.count_human_dna, stat.ratio);

                return res.status(200).json(statSerializer);

            } catch (error) {
                console.error('GetStatsRoute', error);
                if (error instanceof ApiError) {
                    return res.status(error.code).json({ message: error.message });
                }
                return res.status(200).json({ message: error.message });
            }
        });
    }
}
