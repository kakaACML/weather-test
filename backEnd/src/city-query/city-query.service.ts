import { Injectable } from '@nestjs/common';
import { CreateCityQueryDto } from './dto/create-city-query.dto';
import { UpdateCityQueryDto } from './dto/update-city-query.dto';

@Injectable()
export class CityQueryService {
  create(createCityQueryDto: CreateCityQueryDto) {
    return 'This action adds a new cityQuery';
  }

  findAll() {
    return `This action returns all cityQuery`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cityQuery`;
  }

  update(id: number, updateCityQueryDto: UpdateCityQueryDto) {
    return `This action updates a #${id} cityQuery`;
  }

  remove(id: number) {
    return `This action removes a #${id} cityQuery`;
  }
}
