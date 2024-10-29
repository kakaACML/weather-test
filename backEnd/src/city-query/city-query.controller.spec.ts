import { Test, TestingModule } from '@nestjs/testing';
import { CityQueryController } from './city-query.controller';
import { CityQueryService } from './city-query.service';

describe('CityQueryController', () => {
  let controller: CityQueryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityQueryController],
      providers: [CityQueryService],
    }).compile();

    controller = module.get<CityQueryController>(CityQueryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
