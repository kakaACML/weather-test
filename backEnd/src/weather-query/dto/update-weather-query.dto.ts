import { PartialType } from '@nestjs/mapped-types';
import { CreateWeatherQueryDto } from './create-weather-query.dto';

export class UpdateWeatherQueryDto extends PartialType(CreateWeatherQueryDto) {}
