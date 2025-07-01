import { zValidator } from "@hono/zod-validator";
import type { MiddlewareHandler, ValidationTargets } from "hono";
import type { z, ZodSchema } from "zod";

export const validator = <
  T extends ZodSchema,
  Target extends keyof ValidationTargets
>(
  target: Target,
  schema: T
): MiddlewareHandler<
  any,
  any,
  {
    in: {
      [K in Target]: z.infer<T>;
    };
    out: {
      [K in Target]: z.infer<T>;
    };
  }
> => {
  return zValidator(target, schema, (result) => {
    if (!result.success) {
      throw result.error;
    }
  });
};
