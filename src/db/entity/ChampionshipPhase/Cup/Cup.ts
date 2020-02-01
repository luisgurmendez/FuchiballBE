import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Cup {

  @PrimaryGeneratedColumn()
  id: number;

}