import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FootballDataModule } from './football-data/football-data.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    ConfigModule.forRoot(),
    UsersModule,
    FootballDataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
