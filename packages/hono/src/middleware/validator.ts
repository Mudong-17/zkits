import { zValidator } from "@hono/zod-validator";
import type { ValidationTargets } from "hono";
import type { ZodSchema } from "zod";

export const validator = <
  T extends ZodSchema,
  Target extends keyof ValidationTargets
>(
  target: Target,
  schema: T
) => {
  return zValidator(target, schema, (result) => {
    if (!result.success) {
      throw result.error;
    }
  });
};
