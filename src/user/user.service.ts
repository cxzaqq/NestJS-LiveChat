import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });

    // console.log(user);

    return user;
  }

  // async createTestUser() {
  //   await this.prisma.user.create({
  //     data: {
  //       userId: "2345",
  //       userPw: "2345",
  //       userNickname: "2345"
  //     }
  //   });

  //   return { success: true };
  // }
}
