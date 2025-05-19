import { Test, TestingModule } from '@nestjs/testing';
import { FootballDataService } from './football-data.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';

describe('FootballDataService', () => {
  let service: FootballDataService;
  let httpService: HttpService;

  beforeEach(async () => {
    const httpServiceMock = {
      get: jest.fn(),
    };
    const configServiceMock = {
      get: jest.fn((key: string) => {
        if (key === 'FOOTBALL_API_URL') return 'http://fake-api-url';
        if (key === 'FOOTBALL_API_KEY') return 'fake-api-key';
        return '';
      }),
    };


    const module: TestingModule = await Test.createTestingModule({
      providers: [FootballDataService, {provide: HttpService, useValue: httpServiceMock}, {provide: ConfigService, useValue: configServiceMock}],
    }).compile();

    service = module.get<FootballDataService>(FootballDataService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get teams data', async () => {
    const mockData = { data : { response: [{team:'Deportivo'}]}};
    (httpService.get as jest.Mock).mockReturnValue(of(mockData));
    const result = await service.getTeams('Deportivo');
    expect(result).toEqual(mockData.data);
    expect(httpService.get).toHaveBeenCalledWith(
      'http://fake-api-url/teams?search=Deportivo',
      { headers: { 'x-rapidapi-key': 'fake-api-key' } }
    );
  });
});
