import { Test, TestingModule } from '@nestjs/testing';
import { FootballDataController } from './football-data.controller';
import { FootballDataService } from './football-data.service';

describe('FootballDataController', () => {
  let controller: FootballDataController;

  beforeEach(async () => {
    const mockFootballDataService = {
      getTeams: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FootballDataController],
      providers: [{ provide: FootballDataService, useValue: mockFootballDataService }],
    }).compile();

    controller = module.get<FootballDataController>(FootballDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
