import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class School {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    address!: string;
}
