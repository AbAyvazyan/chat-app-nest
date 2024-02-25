import { Controller, Post, Body } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post("register")
  registerUser(@Body("username") username: string) {
    try {
      const user = this.usersService.registerUser(username);
      return { ok: true, message: "User registered successfully", data: user };
    } catch (e) {
      return { ok: false, message: "User registration failed" };
    }
  }
}