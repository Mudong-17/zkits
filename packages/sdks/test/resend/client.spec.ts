import { ResendClient } from "@/src/resend";
import { describe, test } from "bun:test";

describe("client", () => {
  const client = new ResendClient({
    apiKey: process.env["RESEND_API_KEY"]!,
  });

  test("send email", async () => {
    await client.post("/email", {
      from: process.env["RESEND_TEST_FORM"],
      to: process.env["RESEND_TEST_TO"],
      subject: "test",
      text: "test",
    });
  });
});
