import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateCategoryDto } from './categories.dto';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/Categories')
@UseGuards(AuthGuard)
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) { }

    @Post()
    async create(
        @Req() req: Request,
        @Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto
    ) {
        return await this.categoriesService.createCategory(createCategoryDto, (req as any)?.user.email)
    }

}
