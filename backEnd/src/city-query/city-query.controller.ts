import { Controller, Get, Query } from '@nestjs/common';
import { CityQueryService } from './city-query.service';
import { CreateCityQueryDto } from './dto/create-city-query.dto';
// import { UpdateCityQueryDto } from './dto/update-city-query.dto';

@Controller('cityQuery')
export class CityQueryController {
  constructor(private readonly cityQueryService: CityQueryService) {}

  // 获取城市列表
  @Get('list')
  async findAll(@Query() createCityQueryDto: CreateCityQueryDto) {
    return await this.cityQueryService.findAll(createCityQueryDto);
  }
}
