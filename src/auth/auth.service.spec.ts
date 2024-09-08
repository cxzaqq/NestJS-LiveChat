import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
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
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('signIn', () => {
    it('should throw an error if user is not found', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      await expect(
        authService.signIn('invalidUserId', 'password'),
      ).rejects.toThrow(new UnauthorizedException('user not found'));
    });

    it('should throw an error if password is incorrect', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(mockUser);

      await expect(
        authService.signIn('validUserId', 'wrongPassword'),
      ).rejects.toThrow(new UnauthorizedException('Invalid password'));
    });

    it('should return an JWT token if credentails are valid', async () => {
      const mockToken = 'mockJwtToken';

      jest.spyOn(userService, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(mockToken);

      const result = await authService.signIn('validUserId', 'correctPassword');

      expect(result).toEqual({
        access_token: mockToken,
        statusCode: 200,
      });
    });
  });
});
