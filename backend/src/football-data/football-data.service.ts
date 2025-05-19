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
}
