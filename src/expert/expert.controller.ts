import { Controller, Get, Logger } from '@nestjs/common';
import { ExpertService } from './expert.service';

@Controller('expert')
export class ExpertController {
  constructor(private readonly expertService: ExpertService) {}
  private readonly logger = new Logger(ExpertController.name);

  @Get()
  async getAllExperts() {
    return await this.expertService.getAllExperts();
  }

  // @Post()
  // async createTestExpert() {
  //   return await this.expertService.createTestExpert();
  // }
}
