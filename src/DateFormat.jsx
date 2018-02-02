"usestrict";
/**
 * Date Format 根据下面链接改的 不想挂在Date 原型上简单封装一下
 * http://www.bitscn.com/school/Javascript/201610/751698.html  
 * @param {Date} Date defualt new Date();
 * @example
 * let dateFormat = new DateFormat();
 * dateFormat.format("yy-mm-dd")
 * "17-14-06"
 * dateFormat.format("yyyy-MM-dd hh:mm:ss")
 * "2017-12-06 15:14:31"
 * dateFormat.setDate(new Date("eee"))
 */

class DateFormat {
    constructor(date = new Date()) {
        this.date = date;
        this.format = this.format.bind(this.date);
    }
    setDate(date) {
        this.date = date;
        if (!this.isValidDate()) {
            throw ("You must pass in a valid Date Object");
        }
        this.format = this.format.bind(date);
    }
    isValidDate() {
        return !isNaN(this.date.getDay());
    }
    format(fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

}
export default DateFormat;