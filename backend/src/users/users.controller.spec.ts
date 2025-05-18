import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const mockUsersService ={
      create: jest.fn(dto => ({
        _id: 'fakeId',
        ...dto,
        favoriteTeams:[],
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      getMe: jest.fn(user => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        favoriteTeams: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{provide: UsersService, useValue: mockUsersService},],
    }).compile();
    
    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    const dto: CreateUserDto = {
      name: 'Test User',
      email: 'test@test.com',
      password: 'test',
    };
    const result = await controller.register(dto);
    expect(result).toHaveProperty('_id');
    expect(result.name).toBe(dto.name);
    expect(result.email).toBe(dto.email);
    expect(result.favoriteTeams).toEqual([]);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should get me', async () => {
    const fakeUser = {
      _id: 'fakeId',
      name: 'Test User',
      email: 'test@fake.com',
      favoriteTeams: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await controller.getMe(fakeUser as unknown as User);
    
    expect(result).toHaveProperty('_id', fakeUser._id);
    expect(result).toHaveProperty('email', fakeUser.email);
    expect(service.getMe).toHaveBeenCalledWith(fakeUser);
  })
});
