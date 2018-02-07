//yyyyMMdDHhmmss
// 年   月   日  时    分 秒  毫秒
const reg = /([Yy]+|M+|[Dd]+|[Hh]+|m+|s+|S+)/g;
/**
 * 
 * @param {String} str   用来解析日期的字符串
 * @param {String} format   解析字符串遵守的模式
 * @desc
 *   年   月   日  时    分 秒  毫秒
 *  ([Yy]+|M+|[Dd]+|[Hh]+|m+|s+|S+/g
 * @example
 * dateParse('20180207140211',"yYyyMMDdhhmmss");
 * > Wed Mar 07 2018 14:02:11 GMT+0800 (China Standard Time)
 * dateParse('2018-02-07-14-02-11',"yYyy-MM-Dd-hh-mm-ss");
 * > Wed Mar 07 2018 14:02:11 GMT+0800 (China Standard Time)
 */
function dateParse(str,format) {
    let matcher, date = new Date();
    while ((matcher = reg.exec(format))) {
        let char = matcher[0][0];
        let parsed = str.slice(matcher.index, reg.lastIndex);
        switch (char) {
            case 'Y':
            case 'y':
                date.setFullYear(parsed);
                break;
            case 'M':
                date.setMonth(parsed);
                break;
            case 'D':
            case 'd':
                date.setDate(parsed);
                break;
            case 'H':
            case 'h':
                date.setHours(parsed);
                break;
            case 'm':
                date.setMinutes(parsed);
                break;
            case 's':
                date.setSeconds(parsed);
                break;
            case 'S':
                date.setMilliseconds(parsed);
                break;
           // default:

        }
       
    }
    return date;
}

export default dateParse;

