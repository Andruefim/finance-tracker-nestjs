import { IsString, IsInt } from 'class-validator';

export class CreateTransactionDto {
    @IsString()
    date: string;

    @IsString()
    category: string;

    @IsInt()
    amount: number;

    description?: string;
}
export class UpdateTransactionDto {

    @IsString()
    category: string;

    description?: string;
}

