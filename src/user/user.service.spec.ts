import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const date = new Date();
const user = new UserEntity('newUser@email.com', 'somepassword', date);

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
            create: jest.fn().mockResolvedValue(user),
            findOne: jest.fn().mockResolvedValue(false),
            save: jest.fn().mockResolvedValue(false),
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
    const repoSpy = jest.spyOn(repository, 'findOne').mockResolvedValue(user);
    expect(service.register(user)).rejects.toEqual(
      new Error('User already exists'),
    );
    expect(repoSpy).toBeCalledWith({ where: { email: user.email } });
  });

  test('returns response object when user is successfully registered', async () => {
    const registerResult = await service.register(user);
    expect(registerResult).toStrictEqual({
      id: user.id,
      created: user.created,
      email: user.email,
    });
  });
});
