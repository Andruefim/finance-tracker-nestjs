import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '../auth/auth.guard';
import { Category } from './category.entity';

@Controller('api/Categories')
@UseGuards(AuthGuard)
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) { }

    @Post()
    async create(
        @Req() req: Request,
        @Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto
    ): Promise<Category> {
        console.log('categoryCreateReq', (req as any)?.user)
        return await this.categoriesService.create(createCategoryDto, (req as any)?.user.userId)
    }

    @Get()
    async findAll(@Req() req: Request) {
        return await this.categoriesService.findAll((req as any)?.user.userId);
    }

    @Put(':id')
    async update(
        @Param('id') id: Category['id'],
        @Body(new ValidationPipe()) updateCategoryDto: UpdateCategoryDto,
        @Req() req: Request
    ): Promise<Category> {
        return await this.categoriesService.update(id, (req as any)?.user.userId, updateCategoryDto)
    }

    @Delete(':id')
    async remove(
        @Param('id') id: Category['id'],
        @Req() req: Request
    ) {
        return await this.categoriesService.remove(id, (req as any)?.user.userId);
    }
}
