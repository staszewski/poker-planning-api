import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import UserRo from './user-ro';
import UserDTO from './dto/user';

const user = new UserRo('someid', 'someemail@email.com', new Date('2012'));
const newUser = new UserDTO('newUser@email.com', 'somepass');

describe('UsersService', () => {
  let service: UserService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(user),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('error is thrown when user exists', () => {
    expect(service.register(newUser)).rejects.toEqual(
      new Error('User already exists'),
    );
  });
});
