import {
  BadRequestException,
  ClientException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from "./4xx";
import { InternalErrorException, ServerErrorException } from "./5xx";

export const Exception = {
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  ClientException,
  InternalErrorException,
  ServerErrorException,
};
