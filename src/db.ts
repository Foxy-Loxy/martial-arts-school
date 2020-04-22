import { createConnection } from 'typeorm';
import Trainer from './models/Trainer';

export default async function getDbConnection() {
    const entities = [Trainer];

    const conn = await createConnection({
        type: 'sqlite',
        database: ':memory:',
        entities,
        synchronize: true,
    });

    return conn;
}
