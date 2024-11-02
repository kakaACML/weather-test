import { Test, TestingModule } from '@nestjs/testing';
import { WeatherQueryController } from './weather-query.controller';
import { WeatherQueryService } from './weather-query.service';

describe('WeatherQueryController', () => {
  let controller: WeatherQueryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherQueryController],
      providers: [WeatherQueryService],
    }).compile();

    controller = module.get<WeatherQueryController>(WeatherQueryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
