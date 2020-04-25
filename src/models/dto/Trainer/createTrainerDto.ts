import { IsInt, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength, IsEnum, IsDateString } from 'class-validator';
import { DeepPartial } from 'typeorm';
import LevelType from '../../../constants/trainer';

export default class CreateTrainerDto {
    constructor(data: DeepPartial<CreateTrainerDto>) {
        Object.assign(this, data);
    }

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    username!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    name!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    surName!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    fathersName!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    address!: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(10)
    level!: number;

    @IsNotEmpty()
    @IsEnum(LevelType)
    levelType!: LevelType;

    @IsNotEmpty()
    @IsDateString()
    birthDate!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    photo!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    title!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(65535)
    about!: string;
}
