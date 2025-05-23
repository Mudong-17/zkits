import * as Exception4xx from "./4xx";
import * as Exception5xx from "./5xx";
import { BaseException } from "./base";

export const Exception = {
  ...Exception4xx,
  ...Exception5xx,
  BaseException,
};

export type Exception = typeof Exception;
