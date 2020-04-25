import { getConnection, Repository } from 'typeorm';
import School from '../models/School';

export default function getSchoolRepository(): Repository<School> {
    const conn = getConnection();
    return conn.getRepository(School);
}
