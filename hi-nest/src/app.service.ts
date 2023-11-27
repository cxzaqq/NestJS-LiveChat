import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Cron, CronExpression } from '@nestjs/schedule/dist';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async test(email) {
    await this.mailerService
      .sendMail({
        to: email.email,
        from: 'noreply@nestjs.com',
        subject: '1234',
        text: '1234',
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    return true;
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    console.log('called every 10 seconds');
  }
}
