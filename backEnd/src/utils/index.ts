import dayjs from 'dayjs';

import { RESPONSE_CODE, RESPONSE_MSG, REPLACE_RESPONSE_CODE } from '../enums';

/**
 * @description: 统一返回体
 */
export const responseMessage = (
  data,
  msg: string = RESPONSE_MSG.SUCCESS,
  code: number = RESPONSE_CODE.SUCCESS,
): any => ({ data, msg, code, timestamp: dayjs().valueOf() });

// 替换返回体：重置返回结构和编码
export const responseReplaceMessage = <T = any>(
  data,
  msg: string = RESPONSE_MSG.SUCCESS,
  code: number = 2000,
): Api.Common.Response<T> => {
  return { data, msg, code: REPLACE_RESPONSE_CODE[code] || code };
};

/**
 * 检测值是否为 null | undefined | 空字符串 ""
 */
// export const checkIsEmpty = (value: unknown) => {
//   // 为空标注
//   const TARGET_FLAT = 'is null';
//   const targetTrue = true;

//   if (value === '') {
//     return targetTrue;
//   }
//   const _target = value ?? TARGET_FLAT;
//   if (_target === TARGET_FLAT) {
//     return targetTrue;
//   } else {
//     return false;
//   }
// };
