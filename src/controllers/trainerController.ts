import {
    BaseHttpController,
    controller,
    httpGet,
    httpPost,
    httpPut,
    interfaces,
    requestBody,
    requestParam,
} from 'inversify-express-utils';
import { JsonResult } from 'inversify-express-utils/dts/results';
import { inject } from 'inversify';
import { Repository, DeepPartial } from 'typeorm';
import { validateOrReject } from 'class-validator';
import TYPE from '../constants/types';
import Trainer from '../models/Trainer';
import CreateTrainerDto from '../models/dto/Trainer/createTrainerDto';
import UpdateTrainerDto from '../models/dto/Trainer/updateTrainerDto';

@controller('/api/trainer')
export default class TrainerController extends BaseHttpController implements interfaces.Controller {
    constructor(@inject(TYPE.TrainerRepository) private trainerRepository: Repository<Trainer>) {
        super();
    }

    @httpGet('/')
    private async index(): Promise<JsonResult> {
        return this.json(await this.trainerRepository.find());
    }

    @httpPost('/')
    private async store(@requestBody() newTrainer: DeepPartial<CreateTrainerDto>): Promise<JsonResult> {
        await validateOrReject(new CreateTrainerDto(newTrainer));
        const trainerEntity = this.trainerRepository.create(newTrainer);
        return this.json(await this.trainerRepository.save(trainerEntity));
    }

    @httpGet('/:id')
    private async show(@requestParam('id') id: number): Promise<JsonResult> {
        return this.json(
            await this.trainerRepository.findOneOrFail({
                id,
            }),
        );
    }

    @httpPut('/:id')
    private async update(
        @requestBody() updatedTrainerData: DeepPartial<UpdateTrainerDto>,
        @requestParam('id') id: number,
    ): Promise<JsonResult> {
        await validateOrReject(new UpdateTrainerDto(updatedTrainerData));
        const foundTrainer = await this.trainerRepository.findOneOrFail({
            id,
        });
        const updatedTrainer = this.trainerRepository.merge(foundTrainer, updatedTrainerData);
        await this.trainerRepository.update(id, updatedTrainer);
        return this.json(updatedTrainer);
    }
}
