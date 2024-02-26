import { Injectable, ConflictException } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  private users = [];

  registerUser(username: string, image: any): any {
    const isUsernameTaken = this.users.some(
      (user) => user.username === username,
    );

    if (isUsernameTaken) {
      throw new ConflictException('Username is already taken');
    }

    const user = { id: randomUUID(), username, image };
    this.users.push(user);
    return user;
  }

  getUsers(): any[] {
    return this.users;
  }
}
