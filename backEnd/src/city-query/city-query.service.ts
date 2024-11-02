import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { HEFENG_KEY } from '@/enums';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { responseReplaceMessage } from '@/utils';

import { CreateCityQueryDto } from './dto/create-city-query.dto';

@Injectable()
export class CityQueryService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(createCityQueryDto: CreateCityQueryDto) {
    const { data } = await firstValueFrom(
      this.httpService
        .get('https://geoapi.qweather.com/v2/city/lookup', {
          params: {
            key: HEFENG_KEY,
            location: createCityQueryDto.location,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            // 抛出全局错误
            return throwError(() => new Error('请求失败'));
          }),
        ),
    );
    const { code, ...other } = data;
    if (code === '200') {
      return responseReplaceMessage({ ...other });
    } else {
      throw new BadRequestException('获取数据失败');
    }
  }
}
