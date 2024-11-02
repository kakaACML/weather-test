import { IsNotEmpty } from 'class-validator';

// 自定义DTO(数据传输对象)
export class CreateCityQueryDto {
  /**
   * 查询关键字，支持拼音，汉字，地区LocationID或以英文逗号分隔的经度,纬度坐标
   */
  @IsNotEmpty({ message: 'location不能为空' })
  location: string;
}
