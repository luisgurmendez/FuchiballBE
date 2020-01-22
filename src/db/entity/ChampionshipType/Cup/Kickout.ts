import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Kickout {

  @PrimaryGeneratedColumn()
  id: number;

}
