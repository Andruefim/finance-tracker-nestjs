import { Injectable } from '@nestjs/common';
import { SendgridClient } from './sendgrid-client';
import { MailDataRequired } from '@sendgrid/mail';

@Injectable()
export class EmailService {
    constructor(private readonly sendGridClient: SendgridClient) { }

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
