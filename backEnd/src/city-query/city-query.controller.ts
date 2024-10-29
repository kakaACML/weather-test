import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CityQueryService } from './city-query.service';
import { CreateCityQueryDto } from './dto/create-city-query.dto';
import { UpdateCityQueryDto } from './dto/update-city-query.dto';

@Controller('city-query')
export class CityQueryController {
  constructor(private readonly cityQueryService: CityQueryService) {}

  @Post()
  create(@Body() createCityQueryDto: CreateCityQueryDto) {
    return this.cityQueryService.create(createCityQueryDto);
  }

  @Get()
  findAll() {
    return this.cityQueryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cityQueryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCityQueryDto: UpdateCityQueryDto,
  ) {
    return this.cityQueryService.update(+id, updateCityQueryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cityQueryService.remove(+id);
  }
}
