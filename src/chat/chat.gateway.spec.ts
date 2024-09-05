import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';
import { Server, Socket } from 'socket.io';

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let serverMock: Partial<Server>;
  let socketMock: Partial<Socket>;

  beforeEach(async () => {
    serverMock = {
      emit: jest.fn(),
    };

    socketMock = {
      id: 'test-socket-id',
      emit: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGateway],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
    gateway.server = serverMock as Server;

    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should initialize WebSocket server', () => {
    gateway.afterInit(serverMock as Server);
    expect(console.log).toHaveBeenCalledWith('WebSocket server initialized');
  });

  it('should handle client connection', () => {
    gateway.handleConnection(socketMock as Socket);
    expect(console.log).toHaveBeenCalledWith('Client connected:', socketMock.id);
  });

  it('should handle client disconnection', () => {
    gateway.handleDisconnect(socketMock as Socket);
    expect(console.log).toHaveBeenCalledWith(
      'Client disconnected:',
      socketMock.id,
    );
  });
});
