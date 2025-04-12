import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, MoreThanOrEqual, Repository, DataSource } from 'typeorm';
import { Transaction } from '../transactions/transaction.entity';

@Injectable()
export class TransactionsChartsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,

        private dataSource: DataSource,
    ) { }

    async getTransactionsChart(userId: Transaction['userId']) {
        const [income, expense] = await Promise.all([
            this.transactionsRepository.find({
                where: {
                    userId,
                    amount: MoreThanOrEqual(0),

                },
                select: {
                    date: true,
                    amount: true
                }
            }),
            this.transactionsRepository.find({
                where: {
                    userId,
                    amount: LessThan(0),

                },
                select: {
                    date: true,
                    amount: true
                }
            })
        ]);

        return [
            { type: 'Income', data: income },
            { type: 'Expense', data: expense }
        ];
    }

    async getExpensesChart(userId: Transaction['userId']) {
        return this.dataSource
            .getRepository(Transaction)
            .createQueryBuilder("transaction")
            .where("transaction.userId = :userId AND transaction.Amount < 0", { userId })
            .select("transaction.category")
            .addSelect("SUM(transaction.amount)")
            .groupBy("transaction.category")
            .getRawMany();
    }
}
