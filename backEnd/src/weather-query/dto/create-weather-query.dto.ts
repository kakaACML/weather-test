import { IsNotEmpty } from 'class-validator';

export class CreateWeatherQueryDto {
  /**
   * 查询地区的LocationID
   */
  @IsNotEmpty({ message: 'location不能为空' })
  location: string;
}
