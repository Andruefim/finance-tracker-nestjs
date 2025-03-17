import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    date: string;

    @Column()
    category: string;

    @Column("decimal")
    amount: number;

    @Column({ nullable: true })
    description?: string;

    @ManyToOne(() => User, user => user.transactions, { nullable: false })
    user: User;

    userId?: string;
}