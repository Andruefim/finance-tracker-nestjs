import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { AuthService } from '../auth/auth.service';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction]), UsersModule],
    controllers: [TransactionsController],
    providers: [TransactionsService, AuthService],
    exports: [TypeOrmModule],
})
export class TransactionsModule {}
