import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import UserDTO from './dto/user';
import UserRo from './user-ro';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authSerivce: AuthService,
  ) {}

  async register(data: UserDTO): Promise<UserRo> {
    const { email } = data;
    let user = await this.findUserByEmail(email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user.toResponseObject();
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async login(data: UserDTO) {
    const { email, password } = data;
    const user = await this.findUserByEmail(email);
    if (user) {
      const passwordMatches = this.authSerivce.comparePasswords(
        data.password,
        user.password,
      );
      if (passwordMatches) {
        return await this.authSerivce.generateJwt({ email, password });
      } else {
        throw new HttpException(
          'Login was not Successfulll',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
