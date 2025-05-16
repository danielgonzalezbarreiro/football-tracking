import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let userModel: any;

  beforeEach(async () => {
    userModel = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const userModelMock: any = jest.fn().mockImplementation((data) => ({
      ...data,
      save: userModel.save,
    }));
    userModelMock.findOne = userModel.findOne;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: userModelMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user with hashed password', async () => {
    const dto = { name: 'Test', email: 'test@test.com', password: 'test' };
    userModel.findOne.mockResolvedValue(null);
    userModel.save.mockResolvedValue({ _id: 'fakeId', ...dto, password: 'hashed', favoriteTeams: [] });

    jest.spyOn(bcrypt, 'hash').mockImplementation(async () => 'hashed');

    const result = await service.create(dto);

    expect(userModel.findOne).toHaveBeenCalledWith({ email: dto.email });
    expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10);
    expect(result).toHaveProperty('_id');
    expect(result.password).toBe('hashed');
  });

  it('should throw ConflictException if email already exists', async () => {
    const dto = { name: 'Test', email: 'test@test.com', password: 'test' };
    userModel.findOne.mockResolvedValue({ _id: 'existingId', ...dto });

    await expect(service.create(dto)).rejects.toThrow('Email already exists');
  });

  it('should find a user by email', async () => {
    const fakeUser = { _id: 'fakeId', name: 'Test', email: 'test@test.com', password: 'hashed', favoriteTeams: [] };
    const execMock = jest.fn().mockResolvedValue(fakeUser);
    userModel.findOne.mockReturnValue({ exec: execMock });

    const result = await service.findByEmail('test@test.com');
    expect(userModel.findOne).toHaveBeenCalledWith({ email: 'test@test.com' });
    expect(result).toEqual(fakeUser);
  });
});
