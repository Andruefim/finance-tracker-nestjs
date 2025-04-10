import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { AuthService } from '../auth/auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction])],
    controllers: [TransactionsController],
    providers: [TransactionsService, AuthService]
})
export class TransactionsModule {}
