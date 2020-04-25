import { IsInt, IsString, Max, MaxLength, Min, MinLength, IsEnum, IsDateString, IsOptional } from 'class-validator';
import { DeepPartial } from 'typeorm';
import LevelType from '../../../constants/trainer';

export default class UpdateTrainerDto {
    constructor(data: DeepPartial<UpdateTrainerDto>) {
        Object.assign(this, data);
    }

    @IsOptional()
    @IsString()
    @MaxLength(255)
    username: string | undefined;

    @IsOptional()
    @IsString()
    @MinLength(8)
    newPassword: string | undefined;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    name: string | undefined;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    surName: string | undefined;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    fathersName: string | undefined;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    address: string | undefined;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(10)
    level: number | undefined;

    @IsOptional()
    @IsEnum(LevelType)
    levelType: LevelType | undefined;

    @IsOptional()
    @IsDateString()
    birthDate: string | undefined;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    photo: string | undefined;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    title: string | undefined;

    @IsOptional()
    @IsString()
    @MaxLength(65535)
    about: string | undefined;
}
