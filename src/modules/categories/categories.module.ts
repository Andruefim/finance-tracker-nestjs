import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { AuthService } from '../auth/auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoriesService, AuthService],
    controllers: [CategoriesController]
})
export class CategoriesModule {}
