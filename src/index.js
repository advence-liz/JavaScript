
import DateFormat from "./DateFormat";
import dateParse from "./DateParse";
import { convertDate2Ticks, convertTicks2Date, convertDate2Times, convertTimes2Date } from './DateConvert';
import _ from "lodash";
const { log, assert, group, groupEnd } = console;
var dateStr = new DateFormat().format("yYyyMMDdhhmmss");
var dateStr1 = new DateFormat().format("yYyy-MM-Dd-hh-mm-ss");
group('Date Format');
log('yYyyMMDdhhmmss', new DateFormat().format("yYyyMMDdhhmmss"));
log('yYyyMMDDHhmmss', new DateFormat().format("yYyyMMDDHhmmss"));
log('yYyyMMddhhmmss', new DateFormat().format("yYyyMMddhhmmss"));
log('yyyyMMdDHhmmss', new DateFormat().format("yyyyMMdDHhmmss"));
groupEnd('Date Format');

group("Date Parse");
log(dateStr);
log(dateParse(dateStr, 'yYyyMMDdhhmmss'));
log(dateStr1);
log(dateParse(dateStr1, 'yYyy-MM-Dd-hh-mm-ss'));
groupEnd("Date Parse");

group("convertTimes2Date");
var now = _.now();
var dateNow = new Date(now);
assert(now == convertDate2Times(dateNow), 'now!==convertDate2Times(dateNow)');
log(convertDate2Times(dateNow));
log(now);
log(convertTimes2Date(now, 0));
log(convertTimes2Date(now));
log(convertTimes2Date(now, 9));
log(convertTimes2Date(now, 10));
log(dateNow);

groupEnd("convertTimes2Date");

group('Convert ticks to date');
log(convertTicks2Date(636480768711190000, 8));
log(convertDate2Ticks(convertTicks2Date('636480768711190000',8)));
log(636480768711190000);
//Tue Dec 05 2017 21:21:11 GMT+0800 (China Standard Time)
log(convertTicks2Date(636480768711190000, 9))
//Tue Dec 05 2017 22:21:11 GMT+0800 (China Standard Time)
log(convertTicks2Date(636480768711190000, -5))
//Tue Dec 05 2017 08:21:11 GMT+0800 (China Standard Time)
log(convertTicks2Date(636480768711190000, -540))
//Tue Dec 05 2017 22:21:11 GMT+0800 (China Standard Time)

groupEnd('Convert ticks to date');