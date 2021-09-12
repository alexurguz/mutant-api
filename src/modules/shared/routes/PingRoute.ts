import Server from '../../../Server';
import * as express from 'express';
import IRoute from '../../../domain/IRoute';
import Database from '../../../datasource/database';
import PingUseCase from '../use-case/PingUseCase';
import PingMongodb from '../repository/PingMongodb';

export default class PingRoute implements IRoute {
    async register(server: Server, database: Database<any>): Promise<any> {
        const repository = new PingMongodb(database);
        const useCase = new PingUseCase(repository);

        server.getApp()?.get('/ping', async (req: express.Request, res: express.Response) => {
            try {
                const ping = await useCase.exec();

                res.status(200).json({ ping });
            } catch (error) {
                res.status(500).json({ success: false, error });
            }
        });
    }
}
