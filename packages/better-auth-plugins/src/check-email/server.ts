import type { BetterAuthPlugin } from "better-auth";
import { createAuthEndpoint } from "better-auth/api";
import { z } from "zod";

export const checkEmail = () =>
  ({
    id: "check-email",
    endpoints: {
      checkEmail: createAuthEndpoint(
        "/check-email",
        { method: "POST", body: z.object({ email: z.email() }) },
        async (ctx) => {
          const email = ctx.body.email;
          // 用 adapter 查询用户
          const user = await ctx.context.adapter.findOne({
            model: "user",
            where: [
              {
                field: "email",
                value: email,
              },
            ],
          });

          return ctx.json({ exists: !!user });
        }
      ),
    },
  }) satisfies BetterAuthPlugin;

export type CheckEmailPlugin = ReturnType<typeof checkEmail>;
