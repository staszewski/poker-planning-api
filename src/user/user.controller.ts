import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import UserDTO from './dto/user';
import UserRo from './user-ro';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  register(@Body() user: UserDTO): Promise<UserRo> {
    return this.userService.register(user);
  }
  @Post('login')
  async login(@Body() user) {
    return this.userService.login(user);
  }
}
