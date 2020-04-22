import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsInt, IsDate, Min, Max, IsBoolean, IsEnum, IsString } from 'class-validator';
import LevelType from '../constants/trainer';

@Entity()
export default class Trainer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @IsString()
    @Max(255)
    name!: string;

    @Column()
    @IsString()
    @Max(255)
    surname!: string;

    @Column()
    @IsString()
    @Max(255)
    fathersName!: string;

    @Column()
    @IsString()
    @Max(255)
    address!: string;

    @Column()
    @IsInt()
    @Min(1)
    @Max(10)
    level!: number;

    @Column({
        type: 'enum',
        enum: LevelType,
    })
    @IsEnum(LevelType)
    levelType!: LevelType;

    @Column()
    @IsDate()
    birthDate!: Date;

    @Column()
    @IsString()
    @Max(255)
    photo!: string;

    @Column()
    @IsString()
    @Max(255)
    title!: string;

    @Column({
        type: 'text',
        length: 1024,
    })
    about!: string;

    @Column({
        update: false,
    })
    @IsBoolean()
    readonly isMaster!: boolean;

    @CreateDateColumn({
        update: false,
    })
    readonly createdAt!: Date;

    @UpdateDateColumn({
        update: false,
    })
    readonly updatedAt!: Date;
}
