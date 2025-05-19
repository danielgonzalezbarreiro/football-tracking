import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FootballDataService } from './football-data.service';
import { FootballDataController } from './football-data.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [FootballDataService],
  controllers: [FootballDataController]
})
export class FootballDataModule {}
