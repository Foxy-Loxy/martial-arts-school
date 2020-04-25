import {
    BaseHttpController,
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut,
    interfaces,
    requestBody,
    requestParam,
} from 'inversify-express-utils';
import { JsonResult, StatusCodeResult } from 'inversify-express-utils/dts/results';
import { inject } from 'inversify';
import { Repository, DeepPartial } from 'typeorm';
import { validateOrReject } from 'class-validator';
import TYPE from '../constants/types';
import CreateTrainerDto from '../models/dto/Trainer/createTrainerDto';
import UpdateTrainerDto from '../models/dto/Trainer/updateTrainerDto';
import School from '../models/School';
import CreateSchoolDto from '../models/dto/School/createSchoolDto';
import UpdateSchoolDto from '../models/dto/School/updateSchoolDto';

@controller('/api/school')
export default class TrainerController extends BaseHttpController implements interfaces.Controller {
    constructor(@inject(TYPE.SchoolRepository) private schoolRepository: Repository<School>) {
        super();
    }

    @httpGet('/')
    private async index(): Promise<JsonResult> {
        return this.json(await this.schoolRepository.find());
    }

    @httpPost('/')
    private async store(@requestBody() newSchool: DeepPartial<CreateSchoolDto>): Promise<JsonResult> {
        await validateOrReject(new CreateTrainerDto(newSchool));
        const schoolEntity = this.schoolRepository.create(newSchool);
        return this.json(await this.schoolRepository.save(schoolEntity));
    }

    @httpGet('/:id')
    private async show(@requestParam('id') id: number): Promise<JsonResult> {
        return this.json(
            await this.schoolRepository.findOneOrFail({
                id,
            }),
        );
    }

    @httpPut('/:id')
    private async update(
        @requestBody() updatedSchoolData: DeepPartial<UpdateSchoolDto>,
        @requestParam('id') id: number,
    ): Promise<JsonResult> {
        await validateOrReject(new UpdateTrainerDto(updatedSchoolData));
        const foundSchool = await this.schoolRepository.findOneOrFail({
            id,
        });
        const updatedSchool = this.schoolRepository.merge(foundSchool, updatedSchoolData);
        await this.schoolRepository.update(id, updatedSchool);
        return this.json(updatedSchool);
    }

    @httpDelete('/:id')
    private async delete(@requestParam('id') id: number): Promise<StatusCodeResult> {
        await this.schoolRepository.delete(id);
        return this.statusCode(204);
    }
}
