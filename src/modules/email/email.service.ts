import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SendgridClient } from './sendgrid-client';
import { MailDataRequired } from '@sendgrid/mail';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { randomInt } from 'crypto';

interface IEmailService {
    sendEmailConfirmation(email: string): Promise<{
        confirmationSent: boolean;
        userCode: string;
    }>
    confirmEmail(email: string, code: string): Promise<{
        emailConfirmed: boolean
    }>
    sendEmail(subject: string, message: string, toEmail: string): void;
}

@Injectable()
export class EmailService implements IEmailService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly sendGridClient: SendgridClient,
    ) { }

    async sendEmailConfirmation(email: string) {
        const user = await this.usersRepository.findOneBy({ email });
        if (!user) throw new UnauthorizedException();

        const code = randomInt(10000, 999999).toString();

        const updatedUser = this.usersRepository.update(user.userId, { ...user, emailConfirmationCode: code });

        if (!updatedUser) throw new BadRequestException("Failed to save confirmation code");

        await this.sendEmail(
            "Finance Tracker email confirmaiton",
            `Your confirmation code is ${code}.`,
            user.email
        );

        return {
            confirmationSent: true,
            userCode: code
        }
    } 

    async confirmEmail(email: string, code: string) {
        const user = await this.usersRepository.findOneBy({ email });
        if (!user) throw new UnauthorizedException();

        if (code !== user.emailConfirmationCode) throw new BadRequestException("Invalid confirmation code.");

        const updatedUser = this.usersRepository.update(user.userId, { ...user, emailConfirmed: true });
        if (!updatedUser) throw new BadRequestException("Failed to apply email confirmation.");

        return {
            emailConfirmed: true
        }
    }

    async sendEmail(subject: string, message: string, toEmail: string) {
        const email: MailDataRequired = {
            to: toEmail,
            from: "andruefim@gmail.com",
            subject,
            content: [{ type: 'text/plain', value: message }]
        }
        await this.sendGridClient.send(email);
    }
}
