import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as net from 'net';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  private clients = [];

  // constructor() {}

  afterInit(server: any) {
    this.initListenTCP();
  }

  private initListenTCP() {
    const clientTcp = net.connect(1234, 'localhost');
    clientTcp.setEncoding('utf8');

    clientTcp.on('connect', () => {
      console.log('connection client ok');
    });

    clientTcp.on('error', function (error) {
      console.log(error);
    });

    clientTcp.on('close', function (error) {
      console.log('Connection closed!', error);
    });

    clientTcp.on('data', (data) => {
      console.log('message was received', data);
      this.server.emit('hihi\n');
    });
  }

  async handleConnection(socket: Socket) {
    //
  }

  async handleDisconnect(socket: Socket) {
    //
  }
}
