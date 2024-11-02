import { Test, TestingModule } from '@nestjs/testing';
import { WeatherQueryService } from './weather-query.service';

describe('WeatherQueryService', () => {
  let service: WeatherQueryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherQueryService],
    }).compile();

    service = module.get<WeatherQueryService>(WeatherQueryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
