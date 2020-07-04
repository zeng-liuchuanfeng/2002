var http=require("http");
var goodsdata = require("./json/item.json"); // 导入json
var userList=[]; // 设置空数组保存用户名和密码
function creatServers(route){
var server=http.createServer(function(req,res){ // 当前端使用post发送数据时，数据不在url中，而在data中
    var str="";
    req.on("data",function(_data){
        str=_data.toString();
    });
    req.on("end",function(){
        // req.method  就是请求的方式是get还是post
        // 在nodejs中req.headers就是前端发来的请求头消息
        // console.log(req.headers)
        if(req.method.toLowerCase()==="get"){
            str=req.url.split("?")[1];
        }
        res.writeHead(200,{
            "content-type":"text/html;charset=utf-8",
            "Access-Control-Allow-Origin":"*",
            // 允许请求头数据跨域
            "Access-Control-Allow-Headers":"*"
        })
        var type=req.url.slice(1);
        console.log(str);
        switch(type){
            case 'goods': // 商品列表数据
                route.goods(str,goodsdata,res);
                break;
            case 'commodity': //商品详情
                route.commodity(str,goodsdata,res);
                break;
            case "singnUp":
                route.singnUp(str,res,userList);
                break;
            case "singnIn":
                route.singnIn(str,res,userList);
                break;
        }
    })
})
server.listen(8000,"localhost",function(){
    console.log("开启了服务");
});
}


module.exports=creatServers;