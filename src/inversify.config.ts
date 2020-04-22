import { AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';
import Trainer from './models/Trainer';
import getDbConnection from './db';
import TYPE from './constants/types';
import getRepository from './repositories/trainerRepository';

// Controller imports
import './controllers/trainerController';

const bindings = new AsyncContainerModule(async (bind) => {
    await getDbConnection();

    bind<Repository<Trainer>>(TYPE.TrainerRepository)
        .toDynamicValue(() => {
            return getRepository();
        })
        .inRequestScope();
});

export default bindings;
