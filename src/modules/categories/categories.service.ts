import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { CategoriesData } from './categories.interface';


interface ICategoriesService {
    create(createCategoryDto: CreateCategoryDto, userId: User['userId']): Promise<Category>;

    findAll(userId: User['userId']): Promise<CategoriesData[]>;

    update(id: Category['id'], userId: User['userId'], updateCategoryDto: UpdateCategoryDto): Promise<Category>;

    remove(id: Category['id'], userId: User['userId']): Promise<Category>;
}

@Injectable()
export class CategoriesService implements ICategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,

        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }

    async create(createCategoryDto: CreateCategoryDto, userId: User['userId']) {
        console.log('userId', userId);
        console.log('createCategoryDto', createCategoryDto);
        const user = await this.usersRepository.findOneBy({ userId });
        if (!user) throw new UnauthorizedException();

        console.log('user', user);


        const category = this.categoriesRepository.create({ ...createCategoryDto, user, userId });

        return this.categoriesRepository.save(category);
    }

    async findAll(userId: User['userId']) {
        const [income, expense] = await Promise.all([
            this.categoriesRepository.find({
                where: { userId, type: 'Income' }
            }),
            this.categoriesRepository.find({
                where: { userId, type: 'Expense' }
            })
        ]);

        return [
            { type: 'Income', data: income },
            { type: 'Expense', data: expense }
        ];
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
