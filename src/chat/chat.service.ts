import { Injectable } from '@nestjs/common';
import { Server } from "socket.io";

@Injectable()
export class ChatService {
  private messages: string[] = [];


  async getAllMessages(): Promise<any> {
    return this.messages;
  }

  async emitMessage( message: any): Promise<any> {
    this.messages.push(message);
  }
}