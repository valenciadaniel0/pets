import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({scope: Scope.TRANSIENT})
export class CeibaLogger extends Logger {

  public customError(error: Error) {
    super.error(`${error.name}: ${error.message}.`,error.stack, this.context);
  }

}
