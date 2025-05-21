import { BaseException } from "./base";

export class BadRequestException extends BaseException {
  public constructor(messages?: unknown, code = "BadRequestException") {
    super(400, messages, code);
  }
}

export class UnauthorizedException extends BaseException {
  public constructor(messages?: unknown, code = "UnauthorizedException") {
    super(401, messages, code);
  }
}

export class ForbiddenException extends BaseException {
  public constructor(messages?: unknown, code = "ForbiddenException") {
    super(403, messages, code);
  }
}

export class NotFoundException extends BaseException {
  public constructor(messages?: unknown, code = "NotFoundException") {
    super(404, messages, code);
  }
}

export class ClientException extends BaseException {
  public constructor(messages?: unknown, code = "ClientException") {
    super(400, messages, code);
  }
}
