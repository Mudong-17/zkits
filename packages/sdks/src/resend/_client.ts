import { withQuery } from "ufo";

export interface ResendClientConfig {
  apiKey: string;
}

export type ResendResponse =
  | {
      statusCode: number;
      name: string;
      message: string;
    }
  | {
      id: string;
      [key: string]: any;
    }
  | {
      data: {
        id: string;
      }[];
    };

interface Params {
  [key: string]: any;
}

export class ResendClient {
  private readonly baseURL = "https://api.resend.com";

  private readonly defaultHeaders = {
    "content-type": "application/json",
  };

  public constructor(private config: ResendClientConfig) {}

  public async post<T>(path: string, body: Params): Promise<T> {
    const response = await fetch(`${this.baseURL}${path}`, {
      method: "POST",
      headers: {
        ...this.defaultHeaders,
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    return this._getResponse<T>(response);
  }

  public async get<T>(path: string, params: Params): Promise<T> {
    const url = withQuery(`${this.baseURL}${path}`, params);

    const response = await fetch(url, {
      headers: this.defaultHeaders,
    });

    return this._getResponse<T>(response);
  }

  private async _getResponse<T>(response: Response): Promise<T> {
    const data = await response.json();

    if (data.statusCode) {
      throw new Error(
        `ResendClient: Response Error: ${data.name}: ${data.message}`
      );
    }

    return data as T;
  }
}
