import {
  format,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";

export function formatTime(timestamp: Date): string {
  const now = new Date();
  const past = timestamp;

  const secondsDiff = differenceInSeconds(now, past);
  if (secondsDiff < 60) {
    return "방금 전";
  }

  const minutesDiff = differenceInMinutes(now, past);
  if (minutesDiff < 60) {
    // 0분 전 ~ 59분 전
    return `${minutesDiff}분 전`;
  }

  const hoursDiff = differenceInHours(now, past);
  if (hoursDiff < 24) {
    // 1시간 전 ~ 23시간 전
    return `${hoursDiff}시간 전`;
  }

  const daysDiff = differenceInDays(now, past);
  if (daysDiff < 7) {
    // 1일 전 ~ 6일 전
    return `${daysDiff}일 전`;
  }

  return format(past, "yyyy년 M월 d일");
}
