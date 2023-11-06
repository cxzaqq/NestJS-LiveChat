import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager/dist/caching';

@Injectable()
export class AppService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

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

  async cacheTest() {
    await this.cacheManager.set('key', 'value');
    console.log(await this.cacheManager.get('key'));
    await new Promise((r) => setTimeout(r, 2990));
    console.log(await this.cacheManager.get('key'));
  }
}
