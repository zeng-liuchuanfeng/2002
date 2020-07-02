
    var timer = null;
    // 秒杀函数
    function miaosha(year, month, day, hour, minute, second) {
        // 剩余时间：设定的-当前的
        var leftTime = (new Date(year, month - 1, day, hour, minute, second)) - (new Date());
        // parseInt()返回一个整数。得出剩余的时分秒
        var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10);
        var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10);
        var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);
        var seconds = parseInt(leftTime / 1000 % 60, 10);
        // 结束的时候
        if (seconds < 0) {
            clearTimeout(timer);
        }
        else {
        	// 格式的转化
            days = fix(days, 2);
            hours = fix(hours, 2);
            minutes = fix(minutes, 2);
            seconds = fix(seconds, 2);
            // 递归调用  注意：比当前时间大！
            timer = setTimeout("miaosha(2020,07,6,12,00,00)", 1000);  //// 设置开始的时间
            // 设置时分秒
            em=document.querySelectorAll(".down-time");
            em[0].innerHTML=hours;
            em[1].innerHTML=minutes;
            em[2].innerHTML=seconds;
        }
    }
    //fix函数：数字加0
    function fix(num, length) {
    	// 数字转化为字符串  进行拼接
        return num.toString().length<length?'0'+num:num;
    }