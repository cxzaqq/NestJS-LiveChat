import { Controller, Logger } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserController.name);

  // @Post('/test-user')
  // async createTestUser() {
  //   return await this.userService.createTestUser();
  // }
}
