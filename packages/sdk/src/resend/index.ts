import type { ReactNode } from 'react';
import { Resend } from 'resend';

export interface EmailClientOptions {
  apiKey: string;
  from: string;
}

export class EmailClient {
  private readonly resend: Resend;
  private readonly from: string;

  constructor(options: EmailClientOptions) {
    this.resend = new Resend(options.apiKey);
    this.from = options.from;
  }

  /**
   * 发送邮件
   * @param to 收件人
   * @param subject 邮件标题
   * @param html 邮件 HTML 内容
   */
  async sendEmail({
    to,
    subject,
    html,
    text,
    react,
  }: {
    to: string | string[];
    subject: string;
    html?: string;
    text?: string;
    react?: ReactNode;
  }) {
    const { error, data } = await this.resend.emails.send({
      from: this.from,
      to: to,
      subject: subject,
      html: html,
      text: text,
      react: react,
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return data;
  }
}
