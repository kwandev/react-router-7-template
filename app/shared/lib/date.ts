import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ko";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(duration);
dayjs.tz.setDefault("Asia/Seoul");
dayjs.locale("ko");

const date = dayjs;

export { date as dayjs };
