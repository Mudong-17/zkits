import { caseSnake, caseTitle, get } from "../zkotash";

export class BaseException extends Error {
  public status: number;
  public code: string;
  public override message: string;

  #_messages: unknown;

  public constructor(status: number, messages: unknown, code: string) {
    super();

    this.status = status;
    this.code = code;
    const normalizedCode = caseTitle(code.replace(/^Exception|Exception$/, ""));
    this.code = caseSnake(`${normalizedCode}`).toUpperCase();

    this.#_messages = messages ?? normalizedCode;
    this.message = this.getFirstMessage();
  }

  public getFirstMessage(): string {
    const messages = this.#_messages;

    if (typeof messages === "string") {
      return messages;
    }

    if (Array.isArray(messages) && messages.length > 0) {
      let message = messages[0];
      if (typeof message === "string") {
        return message;
      }

      message = get(message, "message", "");
      if (typeof message === "string") {
        return message;
      }
    }

    const message = get(messages, "message", "");
    if (typeof message === "string") {
      return message;
    }

    return "";
  }
}
