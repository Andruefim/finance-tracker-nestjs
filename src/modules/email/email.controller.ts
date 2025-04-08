import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { randomInt } from 'crypto';

@Controller('api/Authenticate')
@UseGuards(AuthGuard)
export class EmailController {
    @Post("send-email-confirmation")
    sendEmailConfirmation(@Req() req: Request) {

        //const user = await 
        const code = randomInt(10000, 999999).toString();


        return {
            confirmationSent: true,
            userCode: code
        }
    }

}
