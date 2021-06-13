import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import UserDTO from './dto/user';
import UserRo from './user-ro';

@Controller('user')
export class UserController {
  constructor(private useService: UserService) {}

  @Post('register')
  register(@Body() user: UserDTO): Promise<UserRo> {
    return this.useService.register(user);
  }
}
