module.exports=(function(){
    return function(str,res,userList){
        var obj=JSON.parse(str);
        var arr=userList.filter(function(item){
            return item.user === obj.user;
        })
        if(arr.length >0){
            res.write("用户名重复");
        }else{
            userList.push(obj);
            res.write("注册成功")
        }
        res.end();
    }
})()