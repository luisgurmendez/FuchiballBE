import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Phase } from "../Phase";

@Entity()
export class Cup extends Phase {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  size: number;

}