import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FootballDataService {
  private apiUrl: string;
  private apiKey: string;

  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {
    this.apiUrl = this.configService.get<string>('FOOTBALL_API_URL') ?? '';
    this.apiKey = this.configService.get<string>('FOOTBALL_API_KEY') ?? '';
  }
  async getTeams(name: String): Promise<any> {
    try {
      const requestUrl = `${this.apiUrl}/teams?search=${name}`;
  
      const requestHeaders = {
        'x-rapidapi-key': `${this.apiKey}`,
      }
  
      const response = await firstValueFrom(this.httpService.get(requestUrl, { headers: requestHeaders }));
  
      return response.data;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to fetch teams');
    }
  }

  async getTeamById(teamId: number): Promise<any> {
    try {
      const requestUrl = `${this.apiUrl}/teams?id=${teamId}`;
      const requestHeaders = {
        'x-rapidapi-key': `${this.apiKey}`,
      }
      const response = await firstValueFrom(this.httpService.get(requestUrl, { headers: requestHeaders }));
      return response.data;
    } catch(error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to fetch team');
    }
  }

  async getNextFixturesByTeamId(teamId: string,): Promise<any> {
    try {
      const season = 2023;
      const today = new Date();
      const simulatedToday = new Date(new Date(today).setFullYear(2023)).toISOString().split('T')[0];

      const requestUrl = `${this.apiUrl}/fixtures?team=${teamId}&season=${season}&from=${simulatedToday}&to=2023-12-30`;
      const requestHeaders = {
        'x-rapidapi-key': `${this.apiKey}`,
      };

      const response = await firstValueFrom(this.httpService.get(requestUrl, { headers: requestHeaders }));
      return response.data;

    } catch {
      throw new InternalServerErrorException('Failed to fetch fixtures');
    }
  }
}
