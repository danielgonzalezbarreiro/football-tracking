import { Controller, Get, Query } from '@nestjs/common';
import { FootballDataService } from './football-data.service';

@Controller('football-data')
export class FootballDataController {
  constructor(private readonly footballDataService: FootballDataService) {}

  @Get('teams')
  async getTeams(@Query('name') name: string): Promise<any> {
    return this.footballDataService.getTeams(name);
  }
}
