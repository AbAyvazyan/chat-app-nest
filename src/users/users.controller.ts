import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('file') as any)
  registerUser(
    @Body('username') username: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const base64 = file.buffer.toString('base64');
      const user = this.usersService.registerUser(username, base64);
      return {
        ok: true,
        message: 'User registered successfully',
        data: { ...user, image: Buffer.from(base64, 'base64') },
      };
    } catch (e) {
      return { ok: false, message: 'User exists' };
    }
  }
}
