import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transaction } from '../transactions/transaction.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    userId: string;

    @Column()
    email: string;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: null })
    emailConfirmationCode: string;

    @OneToMany(() => Transaction, transaction => transaction.user)
    transactions: Transaction[]
}