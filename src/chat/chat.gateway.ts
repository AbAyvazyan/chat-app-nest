import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection {

  constructor(private readonly chatService: ChatService) {
  }

  @WebSocketServer() server: Server;

  @SubscribeMessage("addMessage")
  async handleAddMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket
  ) {
    await this.chatService.emitMessage(message);
    this.server.emit("allMessages", await this.chatService.getAllMessages());
  }

  @SubscribeMessage("getAllMessages")
  async handleGetAllMessages(@ConnectedSocket() client: Socket) {
    client.emit("allMessages", await this.chatService.getAllMessages());
  }

  handleConnection(client: Socket, ...data: any[]) {
    console.log("Client connected:", client.id);
  }
}