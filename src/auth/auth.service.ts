import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJwt({ email, password }: { email: string; password: string }) {
    const payload = { email, password };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  comparePasswords(password: string, storedHashPassword: string) {
    return bcrypt.compare(password, storedHashPassword);
  }
}
