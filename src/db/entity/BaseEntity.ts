import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, AfterUpdate, UpdateEvent, BeforeInsert, BeforeUpdate } from "typeorm";

@Entity()
export class BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean', { default: false })
  isDeleted: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @Column('timestamp', { nullable: true })
  deletedAt?: Date;

  delete() {
    this.isDeleted = true;
    this.deletedAt = new Date();
  }
}
