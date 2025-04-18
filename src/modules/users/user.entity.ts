import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transaction } from '../transactions/transaction.entity';
import { Category } from '../categories/category.entity';

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

    @Column({ default: false })
    emailConfirmed: boolean;

    @OneToMany(() => Transaction, transaction => transaction.user)
    transactions: Transaction[]

    @OneToMany(() => Category, category => category.user)
    categories: Category[]
}