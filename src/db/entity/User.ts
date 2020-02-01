import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Player } from "./Player";
import { BaseEntity } from "./BaseEntity";
import { Permission } from "../../core/permissions";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    username: string;

    @Column('text')
    password: string;

    @Column()
    name: string;

    @Column('text', { nullable: true })
    img?: string;

    @Column({ type: 'enum', enum: Permission, default: Permission.common })
    permissions: Permission;

    @OneToMany(type => Player, player => player.user)
    players: Player[]
}
