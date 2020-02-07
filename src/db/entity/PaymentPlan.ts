import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PaymentPlan {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cost: number;

}
