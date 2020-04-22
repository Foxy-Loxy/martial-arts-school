import { getConnection, Repository } from 'typeorm';
import Trainer from '../models/Trainer';

export default function getRepository(): Repository<Trainer> {
    const conn = getConnection();
    return conn.getRepository(Trainer);
}
