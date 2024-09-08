import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface ChatRoom {
  name: string;
  users: { userId: string; userNickname: string }[];
}

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly jwtService: JwtService) {}
  private readonly logger = new Logger(ChatGateway.name);

  private rooms: ChatRoom[] = [];

  getRooms(): ChatRoom[] {
    return this.rooms;
  }

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    this.logger.log('WebSocket server initialized');
  }

  async handleConnection(client: Socket) {
    try {
      this.logger.log(`Client connected: ${client.id}`);
      const token = client.handshake.auth.token;
      if (!token) throw new Error('No token provided');

      const decoded = await this.jwtService.verify(token);
      client.data.nickname = decoded.userNickname;
      client.data.userId = decoded.userId;

      client.emit('yourNickname', { nickname: client.data.nickname });

      client.emit('updatedRoomList', this.rooms);
      this.server.emit('updatedRoomList', this.rooms);
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.rooms.forEach((room) => {
      room.users = room.users.filter(
        (user) => user.userId !== client.data.userId,
      );

      const roomInfo = {
        name: room.name,
        users: room.users,
      };

      if (room.users.length === 0) {
        this.rooms = this.rooms.filter((r) => r.name !== room.name);
      } else {
        client.broadcast.to(room.name).emit('userLeft', client.data.nickname);
        this.server.to(room.name).emit('roomInfo', roomInfo);
      }
    });

    client.emit('updatedRoomList', this.rooms);
    this.server.emit('updatedRoomList', this.rooms);
  }

  @SubscribeMessage('createRoom')
  handleCreateRoom(client: Socket, roomName: string) {
    const existingRoom = this.rooms.find((r) => r.name === roomName);

    if (existingRoom) {
      client.emit('createRoomError', 'A room with this name already exists');
      return;
    }

    const userObj = {
      userId: client.data.userId,
      userNickname: client.data.userNickname,
    };

    const newRoom = { name: roomName, users: [userObj] };
    this.rooms.push(newRoom);

    client.join(roomName);
    client.emit('roomCreated', { success: true, roomName: roomName });
    client.emit('roomInfo', newRoom);
    this.server.emit('updatedRoomList', this.rooms);

    this.logger.log(`Room created ${newRoom}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomName: string) {
    const room = this.rooms.find((r) => r.name === roomName);
    const userObj = {
      userId: client.data.userId,
      userNickname: client.data.userNickname,
    };
    if (
      room &&
      !room.users.find((user) => user.userId === client.data.userId)
    ) {
      room.users.push(userObj);
      client.join(roomName);
      client.emit('joinRoom', { success: true, roomName: roomName });
      client.broadcast.to(roomName).emit('userJoined', client.data.nickname);
      this.server.emit('updatedRoomList', this.rooms);

      const roomInfo = {
        name: room.name,
        users: room.users,
      };

      client.emit('roomInfo', roomInfo);
      this.server.to(roomName).emit('roomInfo', room);

      this.logger.log(`${client.id} joined in ${roomName}`);
    }
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, roomName: string) {
    client.leave(roomName);
    const room = this.rooms.find((r) => r.name === roomName);
    if (room) {
      room.users = room.users.filter(
        (user) => user.userId !== client.data.userId,
      );
      if (room.users.length === 0) {
        this.rooms = this.rooms.filter((r) => r.name !== roomName);
      }
      client.broadcast.to(roomName).emit('userLeft', client.data.nickname);
      this.server.emit('updatedRoomList', this.rooms);
      client.emit('updatedRoomList', this.rooms);

      const roomInfo = {
        name: room.name,
        users: room.users,
      };

      client.emit('roomInfo', roomInfo);
      this.server.to(roomName).emit('roomInfo', roomInfo);

      this.logger.log(`${client.id} left from ${roomName}`);
    }
  }

  @SubscribeMessage('sendMessage')
  handleMessage(
    client: Socket,
    { roomName, message }: { roomName: string; message: string },
  ) {
    this.server
      .to(roomName)
      .emit('message', { sender: client.data.nickname, message });

    this.logger.log(`${client.id} / room: ${roomName} / message: ${message}`);
  }
}
