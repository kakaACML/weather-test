import { Test, TestingModule } from '@nestjs/testing';
import { CityQueryService } from './city-query.service';

describe('CityQueryService', () => {
  let service: CityQueryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityQueryService],
    }).compile();

    service = module.get<CityQueryService>(CityQueryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
