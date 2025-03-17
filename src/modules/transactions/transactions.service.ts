import { Injectable } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto, UpdateTransactionDto } from './dto/transaction.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
        private dataSource: DataSource,
    ) { }
    //private transactions: Transaction[] = [];

    async create(transaction: CreateTransactionDto) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(transaction);

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    async findAll(): Promise<Transaction[]> {
        return this.transactionsRepository.find(); 
    }

    async findOne(id: string): Promise<Transaction | null> {
        return this.transactionsRepository.findOneBy({ id }); 
    }

    async delete(id: string) {
        await this.transactionsRepository.delete(id);
    }
}
