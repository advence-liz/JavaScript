
import DateFormat from "./DateFormat";

console.group('Date Format');
console.log('yYyyMMDdhhmmss',new DateFormat().format("yYyyMMDdhhmmss"));
console.log('yYyyMMDDHhmmss',new DateFormat().format("yYyyMMDDHhmmss"));
console.log('yYyyMMddhhmmss',new DateFormat().format("yYyyMMddhhmmss"));
console.log('yyyyMMdDHhmmss',new DateFormat().format("yyyyMMdDHhmmss"));
console.groupEnd('Date Format');