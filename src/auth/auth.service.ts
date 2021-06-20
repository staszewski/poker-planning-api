import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // async login({ email, password }: { email: string; password: string }) {
  //   const user = await this.userService.findOne(email);
  //
  //   return this.authService;
  // }

  async login({ email, password }: { email: string; password: string }) {
    const payload = { email, password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
