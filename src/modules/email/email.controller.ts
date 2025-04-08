import { Body, Controller, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { randomInt } from 'crypto';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from './email.service';
import { ConfirmEmailDto } from '../auth/auth.dto';

@Controller('api/Authenticate')
@UseGuards(AuthGuard)
export class EmailController {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private emailService: EmailService,
    ) { }

    @Post("send-email-confirmation")
    async sendEmailConfirmation(@Req() req: Request) {
        return await this.emailService.sendEmailConfirmation((req as any)?.user.email)
    }

    @Post("confirm-email")
    async confirmEmail(@Req() req: Request, @Body() confirmEmailDto: ConfirmEmailDto) {
        return await this.emailService.confirmEmail((req as any)?.user.email, confirmEmailDto.code)
    }
}
