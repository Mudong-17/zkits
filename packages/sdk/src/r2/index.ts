import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export interface R2ClientOptions {
  bucket: string;
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export class R2Client {
  private readonly r2: S3Client;

  constructor(options: R2ClientOptions) {
    this.r2 = new S3Client({
      region: 'auto',
      credentials: {
        accessKeyId: options.accessKeyId,
        secretAccessKey: options.secretAccessKey,
      },
      endpoint: `https://${options.accountId}.r2.cloudflarestorage.com`,
    });
  }

  /**
   * 上传文件到 R2 存储桶
   * @param bucket - 存储桶名称
   * @param key - 文件在存储桶中的路径/名称
   * @param file - 文件内容，支持 Buffer、Uint8Array 或字符串
   * @param contentType - 文件内容类型（可选）
   * @returns 包含上传结果的 Promise
   */
  async uploadFile({
    bucket,
    key,
    file,
    contentType,
  }: {
    bucket: string;
    key: string;
    file: Buffer | Uint8Array | string;
    contentType?: string;
  }) {
    try {
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file,
        ContentType: contentType,
      });

      const result = await this.r2.send(command);

      return {
        success: true,
        result,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
  /**
   * 从 R2 存储桶下载文件
   * @param bucket - 存储桶名称
   * @param key - 文件在存储桶中的路径/名称
   * @returns 包含文件内容的 Promise，文件内容以 ArrayBuffer 形式返回
   */
  async downloadFile(bucket: string, key: string): Promise<{ success: boolean; buffer?: ArrayBuffer; error?: Error }> {
    try {
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      });

      const result = await this.r2.send(command);

      if (!result.Body) {
        return {
          success: false,
          error: new Error('文件不存在'),
        };
      }

      // 将流转换为ArrayBuffer
      const chunks: Uint8Array[] = [];
      const reader = result.Body.transformToWebStream().getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }

      const buffer = Buffer.concat(chunks);

      return {
        success: true,
        buffer: buffer.buffer,
      };
    } catch (error) {
      return {
        success: false,
        error: new Error(`文件下载失败: ${error instanceof Error ? error.message : '未知错误'}`),
      };
    }
  }
}
