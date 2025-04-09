import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCategoryDto } from './categories.dto';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

interface ICategoriesService {
    createCategory(createCategoryDto: CreateCategoryDto, email: string): Promise<Category>
}

@Injectable()
export class CategoriesService implements ICategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
        private usersRepository: Repository<User>
    ) { }

    async createCategory(createCategoryDto: CreateCategoryDto, email: string) {
        const user = this.usersRepository.findOneBy({ email });
        if (!user) throw new UnauthorizedException();

        const category = this.categoriesRepository.create(createCategoryDto);

        await this.categoriesRepository.save(category);

        return category;
    }
}
