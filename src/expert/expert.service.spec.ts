import { Test, TestingModule } from '@nestjs/testing';
import { ExpertService } from './expert.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('ExpertService', () => {
  let service: ExpertService;
  let prismaService: PrismaService;

  const mockExperts = [
    {
      id: '1',
      expertId: 'expert1',
      expertPw: '1',
      expertName: 'expert1',
      createdAt: '2024-09-15T04:27:42.613Z',
      updatedAt: '2024-09-15T04:27:42.613Z',
    },
    {
      id: '2',
      expertId: 'expert2',
      expertPw: '2',
      expertName: 'expert2',
      createdAt: '2024-09-15T04:27:42.613Z',
      updatedAt: '2024-09-15T04:27:42.613Z',
    },
  ];

  const mockPrismaServcie = {
    expert: {
      findMany: jest.fn().mockResolvedValue(mockExperts),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpertService,
        { provide: PrismaService, useValue: mockPrismaServcie },
      ],
    }).compile();

    service = module.get<ExpertService>(ExpertService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all experts', async () => {
    const experts = await service.getAllExperts();
    expect(experts).toEqual(mockExperts);
    expect(prismaService.expert.findMany).toHaveBeenCalledWith();
  });
});
