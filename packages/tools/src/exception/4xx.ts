import { BaseException } from "./base";

export class BadRequestException extends BaseException {
  public constructor(
    messages?: unknown,
    code = "BadRequestException",
    key?: string
  ) {
    super(400, messages, code, key);
  }
}

export class UnauthorizedException extends BaseException {
  public constructor(
    messages?: unknown,
    code = "UnauthorizedException",
    key?: string
  ) {
    super(401, messages, code, key);
  }
}

export class ForbiddenException extends BaseException {
  public constructor(
    messages?: unknown,
    code = "ForbiddenException",
    key?: string
  ) {
    super(403, messages, code, key);
  }
}

export class NotFoundException extends BaseException {
  public constructor(
    messages?: unknown,
    code = "NotFoundException",
    key?: string
  ) {
    super(404, messages, code, key);
  }
}

export class UnprocessableEntityException extends BaseException {
  public constructor(
    messages?: unknown,
    code = "UnprocessableEntityException",
    key?: string
  ) {
    super(422, messages, code, key);
  }
}

export class ClientException extends BaseException {
  public constructor(
    messages?: unknown,
    code = "ClientException",
    key?: string
  ) {
    super(400, messages, code, key);
  }
}
