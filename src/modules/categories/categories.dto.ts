import { IsString, IsInt } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    name: string;

    description?: string;

    @IsString()
    type: string;
}

export class UpdateCategoryDto {
    @IsString()
    name: string;

    description?: string;
}