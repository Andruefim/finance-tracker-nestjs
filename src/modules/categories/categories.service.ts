import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

interface ICategoriesService {
    create(createCategoryDto: CreateCategoryDto, userId: User['userId']): Promise<Category>;

    findAll(userId: User['userId']): Promise<Category[]>;

    update(id: Category['id'], userId: User['userId'], updateCategoryDto: UpdateCategoryDto): Promise<Category>;

    remove(id: Category['id'], userId: User['userId']): Promise<Category>;
}

@Injectable()
export class CategoriesService implements ICategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
        private usersRepository: Repository<User>
    ) { }

    async create(createCategoryDto: CreateCategoryDto, userId: User['userId']) {
        const user = await this.usersRepository.findOneBy({ userId });
        if (!user) throw new UnauthorizedException();

        const category = this.categoriesRepository.create({ ...createCategoryDto, user, userId });

        return this.categoriesRepository.save(category);
    }

    async findAll(userId: User['userId']) {
        return this.categoriesRepository.findBy({ userId });
    }

    async update(
        id: Category['id'],
        userId: User['userId'],
        updateCategoryDto: UpdateCategoryDto
    ) {
        const category = await this.categoriesRepository.findOneBy({ id });
        if (!category) throw new NotFoundException();
        if (category.userId !== userId) throw new UnauthorizedException();
    
        return this.categoriesRepository.save({...category, ...updateCategoryDto});
    }

    async remove(
        id: Category['id'],
        userId: User['userId'],
    ) {
        const category = await this.categoriesRepository.findOneBy({ id });
        if (!category) throw new NotFoundException();
        if (category.userId !== userId) throw new UnauthorizedException();

        return this.categoriesRepository.remove(category);
    }
}
