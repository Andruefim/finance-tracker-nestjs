import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { AuthService } from '../auth/auth.service';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Category]), UsersModule],
    providers: [CategoriesService, AuthService],
    controllers: [CategoriesController],
    exports: [TypeOrmModule],
})
export class CategoriesModule {}
