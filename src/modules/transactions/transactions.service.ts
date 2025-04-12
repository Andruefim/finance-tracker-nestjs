import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto, UpdateTransactionDto } from './dto/transaction.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,

        @InjectRepository(User)
        private usersRepository: Repository<User>,

        private dataSource: DataSource,
    ) { }

    async create(createTransactionDto: CreateTransactionDto, userId: User['userId']) {
        const user = await this.usersRepository.findOneBy({ userId });
        if (!user) throw new UnauthorizedException();

        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const transaction = new Transaction();
            Object.assign(transaction, { ...createTransactionDto, user, userId });

            await queryRunner.manager.save(Transaction, transaction);

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    async findAll(userId: User['userId']): Promise<Transaction[]> {
        return this.transactionsRepository.findBy({ userId });
    }

    async findOne(id: string): Promise<Transaction | null> {
        return this.transactionsRepository.findOneBy({ id }); 
    }

    async remove(id: string, userId: User['userId']) {
        const category = await this.transactionsRepository.findOneBy({ id });
        if (!category) throw new NotFoundException();
        if (category.userId !== userId) throw new UnauthorizedException();

        await this.transactionsRepository.remove(category);
    }
}
