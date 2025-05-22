import { BaseException } from "./base";

export class InternalErrorException extends BaseException {
  public constructor(
    message: string,
    code = "InternalErrorException",
    key?: string
  ) {
    super(500, message, code, key);
  }
}

export class ServerErrorException extends BaseException {
  public constructor(
    message: string,
    code = "ServerErrorException",
    key?: string
  ) {
    super(500, message, code, key);
  }
}
