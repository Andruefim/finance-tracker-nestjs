import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';


@Controller('api/Authenticate')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get('users')
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Get('user')
    async findOne(@Req() req: Request): Promise<User | null> {
        return await this.usersService.findOne(req.body.user?.userId);
    }

    @Delete('user/:id')
    async remove(@Param('id') id: string) {
        await this.usersService.remove(id);
    }
}
