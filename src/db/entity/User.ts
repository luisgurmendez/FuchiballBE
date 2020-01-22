import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Player } from "./Player";
import { Permission } from "../../core/permissions";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    username: string;

    @Column('text')
    password: string;

    @Column()
    name: string;

    @Column('text', { default: 'common' })
    permissions: Permission;

    @OneToMany(type => Player, player => player.user)
    players: Player[]
}
