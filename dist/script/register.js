function is_agree(){
    var mycheck=document.getElementById('mycheck');
    var mybtn=document.getElementById('mybtn');
    mybtn.addEventListener("click",mybtnClick);
    if(mycheck.checked){
        mybtn.disabled=false;
        mybtn.style.border="1px solid deepskyblue";
        mybtn.style.color="deepskyblue";

    }
    else{
        mybtn.disabled=true;
        mybtn.style.border="1px solid #ccc";
        mybtn.style.color="#ccc";

    }
}

function is_tel(){
    mytel=document.getElementById("mytel").value;
    var tel_msg=document.getElementById("tel_msg");
    var myreg=/^1[0-9]{10}$/;
    if(myreg.test(mytel)){
        tel_msg.innerHTML="输入的手机号正确";
        tel_msg.style.color="lawngreen";
    }else{
        tel_msg.innerHTML="请输入正确的手机号";
        tel_msg.style.color="red";
    }
}
function is_pwd(){
    mypwd=document.getElementById("mypwd").value;
    var tel_pwd=document.getElementById("tel_pwd");
    var myreg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    if(myreg.test(mypwd)){
        tel_pwd.innerHTML="输入的密码合格";
        tel_pwd.style.color="lawngreen";
    }else{
        tel_pwd.innerHTML="请输入8-16位数字和字母";
        tel_pwd.style.color="red";
    }
}


function is_pass(){
    var mypass=document.getElementById("mypass").value;
    var mypwd=document.getElementById("mypwd").value;
    var tel_pass=document.getElementById("tel_pass");
    if(mypass==mypwd){
        tel_pass.innerHTML="两次密码相同";
        tel_pass.style.color="lawngreen";
    }else{
        tel_pass.innerHTML="两次密码不同";
        tel_pass.style.color="red";
    }
    
}

function ajax(type,data){
    var xhr=new XMLHttpRequest();
    xhr.addEventListener("readystatechange",readyStateHandler);
    xhr.open("POST","http://localhost:8000/"+type);
    xhr.send(JSON.stringify(data));
    function readyStateHandler(e){
        if(this.readyState === 4 && this.status === 200){
            if(this.response === "注册成功"){
                alert("注册成功跳转至登陆页面");
                window.location.href="./land.html";
            }else{
                alert("用户名或密码错误，请重新输入")
            }
        }
    }
}

function mybtnClick(e){
        ajax("singnUp",{user : mytel , password : mypwd})
}

function rn(min,max){
            return  parseInt(Math.random()*(max-min)+min);
        }

        function rc(min,max){
            var r=rn(min,max);
            var g=rn(min,max);
            var b=rn(min,max);
            return "rgb("+r+","+g+","+b+")";
        }
        function draw(){
        var w=300;
        var h=200;
        var ctx=c1.getContext("2d");
        ctx.fillStyle=rc(180,230);
        ctx.fillRect(0,0,w,h);
        var pool="ABCDEFGHIJKLIMNOPQRSTUVWSYZqwertyuiopasdfghjklzxcvbnm0123456789";
        for(var i=0;i<4;i++){
            var c=pool[rn(0,pool.length)];//随机的字
            var fs=rn(150,100);//字体的大小
            var deg=rn(-30,30);//字体的旋转角度
            ctx.font=fs+'px Simhei';
            ctx.textBaseline="top";
            ctx.fillStyle=rc(80,150);
            ctx.save();
            ctx.translate(30*i+15,15);
            ctx.rotate(deg*Math.PI/180);
            ctx.fillText(c,35,15);
            ctx.restore();
        }

        for(var i=0;i<5;i++){
            ctx.beginPath();
            ctx.moveTo(rn(0,w),rn(0,h));
            ctx.lineTo(rn(0,w),rn(0,h));
            ctx.strokeStyle=rc(180,230);
            ctx.closePath();
            ctx.stroke();
        }
        for(var i=0;i<50;i++){
            ctx.beginPath();
            ctx.arc(rn(0,w),rn(0,h),1,0,2*Math.PI);
            ctx.closePath();
            ctx.fillStyle=rc(150,200);
            ctx.fill();
        }
    }