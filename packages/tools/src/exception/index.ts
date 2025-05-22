import * as Exception4xx from "./4xx";
import * as Exception5xx from "./5xx";

export const Exception = {
  ...Exception4xx,
  ...Exception5xx,
};

export type Exception = typeof Exception;
