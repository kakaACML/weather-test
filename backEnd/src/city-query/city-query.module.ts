import { Module } from '@nestjs/common';
import { CityQueryService } from './city-query.service';
import { CityQueryController } from './city-query.controller';

@Module({
  controllers: [CityQueryController],
  providers: [CityQueryService],
})
export class CityQueryModule {}
