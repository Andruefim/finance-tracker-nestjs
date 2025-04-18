import { Injectable, Logger } from "@nestjs/common";
import * as SendGrid from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/mail';


@Injectable()
export class SendgridClient {
    private logger: Logger;
    constructor() {
        this.logger = new Logger(SendgridClient.name);

        SendGrid.setApiKey(process.env.SENDGRID_API_KEY ?? '');
    }

    async send(mail: MailDataRequired): Promise<void> {
        try {
            await SendGrid.send(mail);
            this.logger.log(`Email successfully dispatched to ${mail.to as string}`);
        } catch (error) {
            this.logger.error('Error while sending email', error);
            throw error;
        }
    }
}
