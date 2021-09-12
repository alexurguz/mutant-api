import * as DotEnv from 'dotenv';

DotEnv.config({ path: `${process.cwd()}/.env` });

export default class LoadEnv {
    public static readonly PORT: number = parseInt(process.env.PORT || '8888');
    public static readonly DATABASE_CONNECTION_URI: string = process.env.DATABASE_CONNECTION_URI!!;
}
