
import DateFormat from "./DateFormat";
import dateParse from "./DateParse";
import { convertDate2Ticks, convertTicks2Date, convertDate2Times, convertTimes2Date } from './DateConvert';
import _ from "lodash";
const log = console.log;
var dateStr = new DateFormat().format("yYyyMMDdhhmmss");
var dateStr1 = new DateFormat().format("yYyy-MM-Dd-hh-mm-ss");
console.group('Date Format');
console.log('yYyyMMDdhhmmss', new DateFormat().format("yYyyMMDdhhmmss"));
console.log('yYyyMMDDHhmmss', new DateFormat().format("yYyyMMDDHhmmss"));
console.log('yYyyMMddhhmmss', new DateFormat().format("yYyyMMddhhmmss"));
console.log('yyyyMMdDHhmmss', new DateFormat().format("yyyyMMdDHhmmss"));
console.groupEnd('Date Format');

console.group("Date Parse");
console.log(dateStr);
console.log(dateParse(dateStr, 'yYyyMMDdhhmmss'));
console.log(dateStr1);
console.log(dateParse(dateStr1, 'yYyy-MM-Dd-hh-mm-ss'));
console.groupEnd("Date Parse");

console.group("Date Convert");
var now = _.now();
var dateNow = new Date(now);
console.assert(now == convertDate2Times(dateNow), 'now!==convertDate2Times(dateNow)');
console.log(convertDate2Times(dateNow));
console.log(now);
console.log(convertTimes2Date(now, 0));
console.log(convertTimes2Date(now));
console.log(convertTimes2Date(now, 9));
console.log(convertTimes2Date(now, 10));
console.log(dateNow);

console.groupEnd("Date Convert");
log(convertTicks2Date(636480768711190000,8))
 
 //Tue Dec 05 2017 21:21:11 GMT+0800 (China Standard Time)
 log(convertTicks2Date(636480768711190000,9))
 //Tue Dec 05 2017 22:21:11 GMT+0800 (China Standard Time)
 log(convertTicks2Date(636480768711190000,-5))
 //Tue Dec 05 2017 08:21:11 GMT+0800 (China Standard Time)
 log(convertTicks2Date(636480768711190000,-540))
 //Tue Dec 05 2017 22:21:11 GMT+0800 (China Standard Time)