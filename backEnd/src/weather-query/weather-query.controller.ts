import { Controller, Get, Query } from '@nestjs/common';
import { WeatherQueryService } from './weather-query.service';
import { CreateWeatherQueryDto } from './dto/create-weather-query.dto';

@Controller('weatherQuery')
export class WeatherQueryController {
  constructor(private readonly weatherQueryService: WeatherQueryService) {}

  // 获取实时天气
  @Get('realTime')
  async find(@Query() createWeatherQueryDto: CreateWeatherQueryDto) {
    return await this.weatherQueryService.findRealTime(createWeatherQueryDto);
  }

  // 获取近7天天气
  @Get('7d')
  async find7d(@Query() createWeatherQueryDto: CreateWeatherQueryDto) {
    return await this.weatherQueryService.find7d(createWeatherQueryDto);
  }
}
