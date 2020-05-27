import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';
import { Message } from './message';
import { CeibaLogger } from '../configuracion/ceiba-logger.config';

@Catch(ErrorDeNegocio)
export class FiltroExcepcionesDeNegocio implements ExceptionFilter {

  constructor(private readonly logger: CeibaLogger) {
    this.logger.setContext(FiltroExcepcionesDeNegocio.name);
  }

  catch(error: ErrorDeNegocio, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode = HttpStatus.BAD_REQUEST;

    const message: Message = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: error.message,
    };

    this.logger.customError(error);
    response.status(statusCode).json(message);
  }
}
