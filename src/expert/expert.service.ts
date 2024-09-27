import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpertService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllExperts() {
    const experts = await this.prisma.expert.findMany({
      select: {
        id: true,
        expertName: true,
      },
    });
    return {
      list: experts,
      statusCode: HttpStatus.OK,
    };
  }

  // async createTestExpert() {
  //   for (let i = 1; i < 11; i++) {
  //     await this.prisma.expert.create({
  //       data: {
  //         expertId: `expert${i}`,
  //         expertPw: `${i}${i}${i}${i}`,
  //         expertName: `expert${i}`,
  //       },
  //     });
  //   }

  //   return { success: true };
  // }
}
