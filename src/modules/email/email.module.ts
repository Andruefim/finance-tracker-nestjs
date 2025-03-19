import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendgridClient } from './sendgrid-client';
import { EmailController } from './email.controller';

@Module({
    providers: [EmailService, SendgridClient],
    exports: [EmailService],
    controllers: [EmailController]
})
export class EmailModule {}
