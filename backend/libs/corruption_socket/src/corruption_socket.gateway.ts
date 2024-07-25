import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CommunicationServerToClientEvents } from './types/events';
import { MESSAGE_DELTA_CREATED } from '@app/constants';

@WebSocketGateway({
  namespace: 'corruption',
  cors: {
    origin: '*',
  },
})
export class CorruptionSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {}

  handleDisconnect(client: Socket) {
    console.log(`Client of id ${client.id} disconnected`);
  }

  @SubscribeMessage('join_room')
  handleMessage(
    @MessageBody() payload: { room: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(payload.room);
    console.log(`Client ${client.id} joined room ${payload.room}`);
    return;
  }

  @WebSocketServer()
  server: Server<any, CommunicationServerToClientEvents>;

  handleConnection(client: Socket) {
    client.join(client.data.user['userId']);
    console.log(`Client of id ${client.id} connected`);
  }

  sendUserDeltaMessage(userId: string, message: string) {
    this.server.to(userId).emit(MESSAGE_DELTA_CREATED, message);
  }
}
