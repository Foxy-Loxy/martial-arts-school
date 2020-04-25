import { AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';
import Trainer from './models/Trainer';
import getDbConnection from './db';
import TYPE from './constants/types';
import getTrainerRepository from './repositories/trainerRepository';

// Controller imports
import './controllers/trainerController';
import getSchoolRepository from './repositories/schoolRepository';
import School from './models/School';

const bindings = new AsyncContainerModule(async (bind) => {
    await getDbConnection();

    bind<Repository<Trainer>>(TYPE.TrainerRepository)
        .toDynamicValue(() => {
            return getTrainerRepository();
        })
        .inRequestScope();

    bind<Repository<School>>(TYPE.SchoolRepository)
        .toDynamicValue(() => {
            return getSchoolRepository();
        })
        .inRequestScope();
});

export default bindings;
