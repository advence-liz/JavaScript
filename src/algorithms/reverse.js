//jscode
//0,1,2|3,4
//2,1,0|4,3
//3,4|0,1,2
 
/**
 * 调整字符串的位置将前n移到后面
 * 
 * @method reverse
 * @param  {string} 要改变的字符串
 * @param  {number} 移到后面的个数 
 * @return {string} 返回新的字符串
 */
function reverse(str, n) {
    /**
     * arr 将字符串转为数组
     * arr_length 数组的长度
     */
    
    var arr=str.split(""),
        arr_length=arr.length;
       

    function reverseString(from, to) {
        while (from < to) {
            var t = arr[from];
            arr[from++] = arr[to];
            arr[to--] = t;
        }
    }

    reverseString(0,n-1);
    reverseString(n,arr_length-1);
    arr.reverse();
    return arr.join('');
    
}

reverse('012345',3);