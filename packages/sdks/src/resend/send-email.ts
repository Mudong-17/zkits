import type { ResendClient, ResendResponse } from "./_client";

export interface SendEmailParams {
  from: string;
  to: string | string[];
  subject: string;
  bcc?: string | string[];
  cc?: string | string[];
  scheduled_at?: string;
  reply_to?: string | string[];
  html?: string;
  text?: string;
  react?: React.ReactNode;
  headers?: Record<string, string>;
  attachments?: {
    content?: Buffer | string;
    filename?: string;
    path?: string;
    content_type?: string;
  }[];
  tags?: {
    name: string;
    value: string;
  }[];
}

export const sendEmail = async (
  client: ResendClient,
  params: SendEmailParams
): Promise<ResendResponse> => {
  return await client.post("/email", params);
};
