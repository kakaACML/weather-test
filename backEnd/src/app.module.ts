import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityQueryModule } from './city-query/city-query.module';
import { CommonModule } from './common/commonModule';
import { WeatherQueryModule } from './weather-query/weather-query.module';

@Module({
  imports: [CityQueryModule, CommonModule, WeatherQueryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
