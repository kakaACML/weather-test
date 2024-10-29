import { PartialType } from '@nestjs/mapped-types';
import { CreateCityQueryDto } from './create-city-query.dto';

export class UpdateCityQueryDto extends PartialType(CreateCityQueryDto) {}
