import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (status === 401) {
      response.render('errors/401', {layout: false});
    } else {
      response
          .status(status)
          .json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: ctx.getRequest().url,
          });
    }
  }
}