import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateTransactionDto, UpdateTransactionDto } from './dto/transaction.dto';
import { Observable, of } from 'rxjs';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';
import { AuthGuard } from '../auth/auth.guard';


@Controller('api/Transactions')
@UseGuards(AuthGuard)
export class TransactionsController {
    constructor(private transactionsService: TransactionsService) { }

    @Post()
    async create(
        @Req() req: Request,
        @Body(new ValidationPipe()) createTransactionDto: CreateTransactionDto
    ) {
        return await this.transactionsService.create(createTransactionDto, (req as any)?.user.userId);
    }

    @Get()
    async findAll(@Req() req: Request): Promise<Transaction[]> {
        return await this.transactionsService.findAll((req as any)?.user.userId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.transactionsService.findOne(id);
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req: Request) {
        return await this.transactionsService.remove(id, (req as any)?.user.userId); 
    }
}
