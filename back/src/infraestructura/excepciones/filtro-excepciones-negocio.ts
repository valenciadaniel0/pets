import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorDeNegocio } from 'src/dominio/excepciones/error-de-negocio';
import { Message } from './message';

@Catch(ErrorDeNegocio)
export class FiltroExcepcionesDeNegocio implements ExceptionFilter {
  constructor(private logger: Logger) { }

  catch(exception: ErrorDeNegocio, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const message: Message = {
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message
    };

    this.logger.log(message);

    response.status(HttpStatus.BAD_REQUEST).json(message);
  }
}
