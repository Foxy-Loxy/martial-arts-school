import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { DeepPartial } from 'typeorm';

export default class CreateSchoolDto {
    constructor(data: DeepPartial<CreateSchoolDto>) {
        Object.assign(this, data);
    }

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    name!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    address!: string;
}
