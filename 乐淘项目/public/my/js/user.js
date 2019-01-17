//  存储用户信息
var userInfo = null;
$.ajax({
    url:"/user/queryUserMessage",
    type:"get",
    // 同步 默认true 异步
    async:false,
    success:function(res){
        // console.log(res);

        // 用户没有登录
        if( res.error && res.error == 400){
            location.href = "./login.html";
        }
        userInfo = res;
    }
})

$(function(){
    // 退出登录
    $("#logout").on("tap",function(){
        $.ajax({
            url:"/user/logout",
            type:"get",
            success:function(res){
                // console.log(res);
                if( res.success){
                    mui.toast("退出成功");

                    setInterval(function(){
                        location.href = "./index.html";
                    },2000)
                }
            }
        })
    });

    var html = template("lis",userInfo)
    console.log(html);
    $("#userInfoBox").html(html);
})