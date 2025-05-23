import { BaseException } from "./base";

export class InternalErrorException extends BaseException {
  public constructor(message: string, code = "InternalErrorException") {
    super(500, message, code);
  }
}

export class ServerErrorException extends BaseException {
  public constructor(message: string, code = "ServerErrorException") {
    super(500, message, code);
  }
}
