import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
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
        @Body(new ValidationPipe()) createTransactionDto: CreateTransactionDto
    ) {
        await this.transactionsService.create(createTransactionDto);
    }

    @Get()
    async findAll(): Promise<Transaction[]> {
        return await this.transactionsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Transaction> {
        const transaction = await this.transactionsService.findOne(id);

        if (!transaction)
            throw new BadRequestException(`Transaction with id: ${id} doesn't exist.`);

        return transaction;
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.transactionsService.delete(id); 
    }
}
