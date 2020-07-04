module.exports=(function(){
    return function(str,res,userList){
        var obj=JSON.parse(str);
        var arr=userList.filter(function(item){
            return (item.user===obj.user) &&(item.password === obj.password)
        })
        if(arr.length>0){
            res.write("登陆成功");
        }else{
            res.write("用户名或密码错误");
        }
        res.end();
    }
})()