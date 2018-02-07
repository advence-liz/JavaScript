
import DateFormat from "./DateFormat";
import dateParse from "./DateParse";
var dateStr = new DateFormat().format("yYyyMMDdhhmmss");
var dateStr1 = new DateFormat().format("yYyy-MM-Dd-hh-mm-ss");
console.group('Date Format');
console.log('yYyyMMDdhhmmss',new DateFormat().format("yYyyMMDdhhmmss"));
console.log('yYyyMMDDHhmmss',new DateFormat().format("yYyyMMDDHhmmss"));
console.log('yYyyMMddhhmmss',new DateFormat().format("yYyyMMddhhmmss"));
console.log('yyyyMMdDHhmmss',new DateFormat().format("yyyyMMdDHhmmss"));
console.groupEnd('Date Format');

console.group("Date Parse");
console.log(dateStr);
console.log(dateParse(dateStr,'yYyyMMDdhhmmss'));
console.log(dateStr1);
console.log(dateParse(dateStr1,'yYyy-MM-Dd-hh-mm-ss'));
console.groupEnd("Date Parse");

