import { Module } from '@nestjs/common';
import { ExpertService } from './expert.service';
import { ExpertController } from './expert.controller';
import { PrismaModule } from '@src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExpertController],
  providers: [ExpertService],
  exports: [ExpertService],
})
export class ExpertModule {}
