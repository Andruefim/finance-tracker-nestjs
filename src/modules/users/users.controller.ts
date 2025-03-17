import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User | null> {
        return await this.usersService.findOne(id);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.usersService.remove(id);
    }
}
