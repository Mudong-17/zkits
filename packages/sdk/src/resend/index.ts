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
  async sendEmail(to: string, subject: string, html: string) {
    const { error, data } = await this.resend.emails.send({
      from: this.from,
      to,
      subject,
      html,
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return data;
  }
}
