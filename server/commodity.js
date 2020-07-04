module.exports=(function(){
    return function(str,goodsdata,res){
        var arr=goodsdata.filter(function(item){
            var obj=JSON.parse(str);
            return item["id"]==obj.split("=")[1];
        })
        res.write(JSON.stringify(arr));
        res.end();
    }
})()