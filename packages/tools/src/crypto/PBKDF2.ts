import crypto from "crypto-js";

// 配置参数
const SALT_LENGTH = 16; // 盐值长度（字节）
const ITERATIONS = 100000; // 迭代次数
const KEY_LENGTH = 32; // 密钥长度（字节，256 位）

/**
 * 生成 随机盐值
 * @param length 盐值长度
 * @returns 盐值
 */
export const generateSalt = (length: number = SALT_LENGTH) => {
  return crypto.lib.WordArray.random(length).toString(crypto.enc.Hex);
};
/**
 * 生成 PBKDF2 密钥
 * @param password 密码
 * @param salt 盐值
 * @returns 密钥
 */
export const generatePBKDF2Key = (
  password: string,
  salt: string = generateSalt()
) => {
  const hash = crypto
    .PBKDF2(password, crypto.enc.Hex.parse(salt), {
      keySize: KEY_LENGTH / 4, // WordArray 使用 4 字节/字
      iterations: ITERATIONS,
      hasher: crypto.algo.SHA256, // 使用 SHA-256
    })
    .toString(crypto.enc.Hex);

  return `pbkdf2$${salt}$${ITERATIONS}$${hash}`;
};

/**
 * 验证 PBKDF2 密钥
 * @param password 密码
 * @param key 密钥
 * @returns 是否验证成功
 */
export const verifyPBKDF2Key = (password: string, key: string): boolean => {
  const parts = key.split("$$");
  // 确保格式正确
  if (parts.length !== 4) {
    return false;
  }

  const [, salt, iterStr, hash] = parts;

  // 确保所有必需的组件都存在
  if (!salt || !iterStr || !hash) {
    return false;
  }

  // 确保迭代次数是有效的数字
  const iterations = parseInt(iterStr, 10);
  if (isNaN(iterations)) {
    return false;
  }

  const computedHash = crypto
    .PBKDF2(password, crypto.enc.Hex.parse(salt), {
      keySize: KEY_LENGTH / 4, // WordArray 使用 4 字节/字
      iterations: iterations,
      hasher: crypto.algo.SHA256, // 使用 SHA-256
    })
    .toString(crypto.enc.Hex);
  return computedHash === hash;
};
