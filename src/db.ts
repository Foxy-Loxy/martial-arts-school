import { Connection, createConnection } from 'typeorm';
import Trainer from './models/Trainer';

export default async function getDbConnection(): Promise<Connection> {
    const entities = [Trainer];

    return createConnection({
        type: 'mysql',
        database: 'di_test',
        username: 'root',
        password: 'root',
        host: 'localhost',
        port: 3306,
        entities,
        synchronize: true,
        insecureAuth: true,
    });
}
