import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import { Exclude, classToPlain } from 'class-transformer';
import bcrypt from 'bcrypt';
import LevelType from '../constants/trainer';

@Entity()
export default class Trainer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        unique: true,
    })
    username!: string;

    @Exclude()
    @Column()
    password!: string;

    @Column()
    name!: string;

    @Column()
    surName!: string;

    @Column()
    fathersName!: string;

    @Column()
    address!: string;

    @Column()
    level!: number;

    @Column({
        type: 'enum',
        enum: LevelType,
    })
    levelType!: LevelType;

    @Column()
    birthDate!: Date;

    @Column()
    photo!: string;

    @Column()
    title!: string;

    @Column({
        type: 'text',
    })
    about!: string;

    @CreateDateColumn({
        update: false,
    })
    readonly createdAt!: Date;

    @UpdateDateColumn({
        update: false,
    })
    readonly updatedAt!: Date;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }

    toJSON(): object {
        return classToPlain(this);
    }
}
