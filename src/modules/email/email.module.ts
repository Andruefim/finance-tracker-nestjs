import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendgridClient } from './sendgrid-client';
import { EmailController } from './email.controller';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        AuthModule,
        UsersModule
    ],
    providers: [EmailService, SendgridClient],
    exports: [EmailService],
    controllers: [EmailController]
})
export class EmailModule {}
