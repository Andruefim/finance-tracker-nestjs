import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TransactionsChartsService } from './transactions-charts.service';

@Controller('api/transactions/charts')
@UseGuards(AuthGuard)
export class TransactionsChartsController {
    constructor(private transactionsChartsService: TransactionsChartsService) { }

    @Get('transactions-chart')
    async getTransactionsChart(@Req() req: Request) {
        return await this.transactionsChartsService.getTransactionsChart((req as any)?.user.userId)
    }

    @Get('expenses-chart')
    async getExpensesChart(@Req() req: Request) {
        return await this.transactionsChartsService.getExpensesChart((req as any)?.user.userId)
    }
}
