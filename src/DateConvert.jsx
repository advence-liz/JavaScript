"usestrict";
const TickOffset = 621355968000000000;
const CurrentTimezonOffset = new Date().getTimezoneOffset();
const CurrentTimezone = -CurrentTimezonOffset / 60;
//60*60*1000 此值定义为常量是有意义，因为 JavaScript 大数运算丢精度下面的表达式转为常量后稳定性提高了好很多 
//times = date.getTime() + (CurrentTimezone - targetTimezone) * HourMillisecond;
const HourMillisecond = 3600000;
/**
 * 此方法以date(精确到秒那种）为基准 计算得出目标时区 相同date 的ticks 数 
 * date 相同的话 时区越大 ticks 越小
 * 正常存入后端cur.getTimes 就OK了，前端回显直接通过 times 转为当前Date 对象
 * @param {Date} date Date 浏览器端Date对象
 * @param {Number} targetTimezone  可以传两种参数 Timezone TimezoneOffset  目标时区 -12 <= targetTimezone <= +12  TimezoneOffset -12*60<=targetTimezone<=12*60
 * @description
 * Ticks = Times* 10000 + TickOffset
 * 当 times 为0 时  UTC 时间为"Thu, 01 Jan 1970 00:00:00 GMT"
 *                 +8 时间为 "Thu Jan 01 1970 08:00:00 GMT+0800 (China Standard Time)"
 * UTC.getTimes + cur.getTimezoneOffset = cur.getTimes  //这里成立的条件是 UTC 和 cur 时同一时间 比如都 8点
 * 下面代码中+ currentTimezone - tragetTimezone 是因为 Timezone 和 TimezoneOffset 正负是相反的
 * UTC.getTimes=cur.getTimes+cur.timezone*n //n=60*60*1000 为常量
 * @example
 * var date = new Date();
 * date
 * Wed Dec 06 2017 14:29:52 GMT+0800 (China Standard Time)
 * convertDate2Ticks(date)
 * 636481385923590000
 * convertDate2Ticks(date)
 * 636481385923590000
 * convertTicks2Date(636481385923590000)
 * Wed Dec 06 2017 14:29:52 GMT+0800 (China Standard Time)
 */
function convertDate2Ticks(date, targetTimezone = CurrentTimezone) {
    if (Math.abs(targetTimezone) > 12) {
        targetTimezone = -targetTimezone / 60;
    }
    let times, ticks
    //UTC.getTimes=cur.getTimes+cur.timezone*n //n=60*60*1000 为常量
    times = date.getTime() + (CurrentTimezone - targetTimezone) * HourMillisecond;
    ticks = times * 10000 + TickOffset;
    return ticks;
}
/**
 * 将ticks 转换为目标date
 * ticks 相同的话 目标时区越大 date 越大 浏览器的Date 构造函数 就会将 Times 转为 当前时区 date 对
 * 但是如果 当前时区不等于目标时区 date 就要加减 时区偏移差的小时数 目标大于 当前时区 则加 
 * 但是由于使用 new Date（times） 生成date 对象 所以通过 加上 偏差对应的tiems 数
 * @param {Number} ticks C# ticks
 * @param {Number} targetTimezoneOffset  targetTimezoneOffset||Timezone
 * @desc Date 方法可以直接将 times 转为当前时区的Date 对象，但是目标时区可能跟当前时区不一样所以需要转化一下
 *  当前时区的times 减去目标时区 偏移的小时 比如 +8 到 -5 就应该减 13 小时
 * @example
 * convertTicks2Date(636480768711190000,8)
 * Tue Dec 05 2017 21:21:11 GMT+0800 (China Standard Time)
 * convertTicks2Date(636480768711190000,9)
 * Tue Dec 05 2017 22:21:11 GMT+0800 (China Standard Time)
 * convertTicks2Date(636480768711190000,-5)
 * Tue Dec 05 2017 08:21:11 GMT+0800 (China Standard Time)
 * convertTicks2Date(636480768711190000,-540)
 * Tue Dec 05 2017 22:21:11 GMT+0800 (China Standard Time)
 */
function convertTicks2Date(ticks, targetTimezone = CurrentTimezone) {
    if (Math.abs(targetTimezone) > 12) {
        targetTimezone = -targetTimezone / 60;
    }
    let times = (ticks - TickOffset) / 10000;
    let currentTimes = times + (targetTimezone - CurrentTimezone) * HourMillisecond;
    return new Date(currentTimes);
}

export {convertDate2Ticks,convertTicks2Date};