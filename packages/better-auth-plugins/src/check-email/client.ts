import type { BetterAuthClientPlugin } from "better-auth";
import type { CheckEmailPlugin } from "./server";

export const checkEmailClient = () =>
  ({
    id: "check-email",
    $InferServerPlugin: {} as CheckEmailPlugin,
  }) satisfies BetterAuthClientPlugin;
