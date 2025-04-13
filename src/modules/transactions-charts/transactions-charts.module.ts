import { Module } from '@nestjs/common';
import { TransactionsChartsController } from './transactions-charts.controller';
import { TransactionsChartsService } from './transactions-charts.service';
import { AuthService } from '../auth/auth.service';
import { TransactionsService } from '../transactions/transactions.service';
import { UsersModule } from '../users/users.module';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
    imports: [TransactionsModule, UsersModule],
    controllers: [TransactionsChartsController],
    providers: [TransactionsChartsService, AuthService, TransactionsService]
})
export class TransactionsChartsModule {}
