module.exports=(function(){
    return function(str,goodsdata,res){
        var m=JSON.stringify(goodsdata); // 把json数据转换成json字符串
        res.write(m);// 把json字符串传输给前端
        res.end();
    }
})()