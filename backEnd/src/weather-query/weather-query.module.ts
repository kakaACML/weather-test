import { Module } from '@nestjs/common';
import { WeatherQueryService } from './weather-query.service';
import { WeatherQueryController } from './weather-query.controller';

@Module({
  controllers: [WeatherQueryController],
  providers: [WeatherQueryService],
})
export class WeatherQueryModule {}
