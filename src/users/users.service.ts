import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";

@Injectable()
export class UsersService {
  private users = [];

  registerUser(username: string): any {
    const user = { id: randomUUID(), username };
    this.users.push(user);
    return user;
  }

  getUsers(): any[] {
    return this.users;
  }
}