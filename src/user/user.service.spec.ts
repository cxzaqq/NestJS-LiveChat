import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  const mockUser = {
    id: '1',
    userId: 'validUserId',
    userPw: 'correctPassword',
    userNickname: 'nickname',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should return a user if found', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

    const user = await userService.findOne('validUserId');
    expect(user).toEqual(mockUser);
  });

  it('should return null if no user is found', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

    const user = await userService.findOne('none');
    expect(user).toBeNull();
  });
});
