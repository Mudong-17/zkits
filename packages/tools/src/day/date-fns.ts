import {
  format,
  parse,
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
  isValid,
  isBefore,
  isAfter,
  differenceInDays,
} from "date-fns";

import { zhCN } from "date-fns/locale"; // 中文本地化
import { TZDate } from "@date-fns/tz";
// 默认配置
const DEFAULT_FORMAT = "yyyy-MM-dd";
const DEFAULT_TIMEZONE = "Asia/Shanghai";
const DEFAULT_LOCALE = zhCN;

// 支持的输入类型
type DateInput = string | Date | number;

/**
 * 格式化日期
 * @param date 日期输入（支持字符串、Date、时间戳）
 * @param fmt 格式（默认：yyyy-MM-dd）
 * @param timezone 时区（可选）
 */
export const formatDate = (
  date: DateInput,
  fmt: string = DEFAULT_FORMAT,
  timezone?: string
): string => {
  const parsedDate = toDate(date);
  if (!isValid(parsedDate)) return "";

  if (timezone) {
    // 将日期转换为指定时区
    const tzDate = new TZDate(parsedDate, timezone);
    return format(tzDate, fmt, { locale: DEFAULT_LOCALE });
  }
  return format(parsedDate, fmt, { locale: DEFAULT_LOCALE });
};

/**
 * 解析日期字符串
 * @param dateStr 日期字符串
 * @param fmt 格式
 * @returns Date 对象
 */
export const parseDate = (
  dateStr: string,
  fmt: string = DEFAULT_FORMAT
): Date => {
  return parse(dateStr, fmt, new Date());
};

/**
 * 转换为 Date 对象
 * @param input 日期输入
 * @returns Date 对象
 */
export const toDate = (input: DateInput): Date => {
  if (input instanceof Date) return input;
  if (typeof input === "number") return new Date(input);
  if (typeof input === "string") {
    const parsed = new Date(input);
    return isValid(parsed) ? parsed : parseDate(input);
  }
  return new Date();
};

/**
 * 获取昨天
 * @param date 基准日期（可选）
 */
export const getYesterday = (date: DateInput = new Date()): Date => {
  return subDays(toDate(date), 1);
};

/**
 * 获取明天
 * @param date 基准日期（可选）
 */
export const getTomorrow = (date: DateInput = new Date()): Date => {
  return addDays(toDate(date), 1);
};

/**
 * 获取本周开始
 * @param date 基准日期（可选）
 */
export const getStartOfWeek = (date: DateInput = new Date()): Date => {
  return startOfWeek(toDate(date), { locale: DEFAULT_LOCALE });
};

/**
 * 获取本周结束
 * @param date 基准日期（可选）
 */
export const getEndOfWeek = (date: DateInput = new Date()): Date => {
  return endOfWeek(toDate(date), { locale: DEFAULT_LOCALE });
};

/**
 * 计算日期差（天）
 * @param startDate 开始日期
 * @param endDate 结束日期
 */
export const getDaysDiff = (
  startDate: DateInput,
  endDate: DateInput
): number => {
  return differenceInDays(toDate(endDate), toDate(startDate));
};

/**
 * 判断日期是否在指定范围内
 * @param date 待检查日期
 * @param start 开始日期
 * @param end 结束日期
 */
export const isInRange = (
  date: DateInput,
  start: DateInput,
  end: DateInput
): boolean => {
  const d = toDate(date);
  return isAfter(d, toDate(start)) && isBefore(d, toDate(end));
};

/**
 * 获取当前时间（带时区）
 * @param fmt 格式
 * @param timezone 时区
 */
export const now = (
  fmt: string = "yyyy-MM-dd HH:mm:ss",
  timezone: string = DEFAULT_TIMEZONE
): string => {
  // 将当前时间转换为指定时区
  const tzDate = new TZDate(new Date(), timezone);
  return format(tzDate, fmt, { locale: DEFAULT_LOCALE });
};
