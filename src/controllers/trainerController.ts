import { BaseHttpController, controller, httpGet, interfaces } from 'inversify-express-utils';
import { JsonResult } from 'inversify-express-utils/dts/results';
import { inject } from 'inversify';
import { Repository } from 'typeorm';
import TYPE from '../constants/types';
import Trainer from '../models/Trainer';

@controller('/')
export default class TrainerController extends BaseHttpController implements interfaces.Controller {
    constructor(@inject(TYPE.TrainerRepository) private fruitRepository: Repository<Trainer>) {
        super();
    }

    @httpGet('')
    private async index(): Promise<JsonResult> {
        return this.json(await this.fruitRepository.find());
    }
}
