import { IsString, MaxLength, IsOptional } from 'class-validator';
import { DeepPartial } from 'typeorm';

export default class UpdateSchoolDto {
    constructor(data: DeepPartial<UpdateSchoolDto>) {
        Object.assign(this, data);
    }

    @IsOptional()
    @IsString()
    @MaxLength(255)
    name: string | undefined;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    address: string | undefined;
}
