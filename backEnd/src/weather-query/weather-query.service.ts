import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { HEFENG_KEY } from '@/enums';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { responseReplaceMessage } from '@/utils';

import { CreateWeatherQueryDto } from './dto/create-weather-query.dto';

@Injectable()
export class WeatherQueryService {
  constructor(private readonly httpService: HttpService) {}

  async findRealTime(createWeatherQueryDto: CreateWeatherQueryDto) {
    const { data } = await firstValueFrom(
      this.httpService
        .get('https://devapi.qweather.com/v7/weather/now', {
          params: {
            key: HEFENG_KEY,
            location: createWeatherQueryDto.location,
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

  async find7d(createWeatherQueryDto: CreateWeatherQueryDto) {
    const { data } = await firstValueFrom(
      this.httpService
        .get('https://devapi.qweather.com/v7/weather/7d', {
          params: {
            key: HEFENG_KEY,
            location: createWeatherQueryDto.location,
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
  async find24h(createWeatherQueryDto: CreateWeatherQueryDto) {
    const { data } = await firstValueFrom(
      this.httpService
        .get('https://devapi.qweather.com/v7/weather/24h', {
          params: {
            key: HEFENG_KEY,
            location: createWeatherQueryDto.location,
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
