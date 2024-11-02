import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { responseReplaceMessage } from '@/utils';

// 获取特定异常信息
const _getMessage = (exception: HttpException) => {
  const response = exception.getResponse();

  if (!response) return false;

  if (typeof response === 'string') return response;

  return response['message'] || false;
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // const status = exception.getStatus();

    // console.log('全局request headers', request.headers);
    // console.log('全局exception', exception);

    // 获取状态码，判断是HTTP异常还是服务器异常
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 获取错误信息，判断是HTTP异常还是服务器异常
    const msg =
      exception instanceof HttpException
        ? _getMessage(exception) || exception.message
        : '服务器内部错误!';

    response
      .status(statusCode)
      .json(responseReplaceMessage(null, msg, statusCode));
  }
}
