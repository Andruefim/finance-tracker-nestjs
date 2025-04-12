import { Module } from '@nestjs/common';
import { TransactionsChartsController } from './transactions-charts.controller';
import { TransactionsChartsService } from './transactions-charts.service';
import { AuthService } from '../auth/auth.service';
import { TransactionsService } from '../transactions/transactions.service';

@Module({
  controllers: [TransactionsChartsController],
  providers: [TransactionsChartsService, AuthService, TransactionsService]
})
export class TransactionsChartsModule {}
