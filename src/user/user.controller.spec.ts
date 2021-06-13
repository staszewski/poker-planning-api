import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import UserRo from './user-ro';
import UserDTO from './dto/user';

const user = new UserRo('someid', 'newUser@email.com', new Date('2012'));
const newUser = new UserDTO('newUser@email.com', 'somepass');

describe('UsersController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            register: jest.fn().mockResolvedValue(user),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('returns response object when registered successfully', async () => {
    expect(await controller.register(newUser)).toEqual(user);
  });
});
