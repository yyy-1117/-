//  进入页面就发送同步请求判断是否登录
$.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    async:false,
    success: function (res) {
        // console.log(res)
        if(res.success){
            location.href = "user.html";
        }
    }
});


$(function(){
    // 获取登录按钮添加事件
    $("#login-button").on("click",function(){
         // 获取表单的值
    var username = $.trim($("[name = username]").val());
    var password = $.trim($("[name = password]").val());
        // 判断
        if(!username){
            alert("请输入用户名");
            return;
        }
        if(!password){
            alert("请输入密码");
            return;
        }
        // 发送登录请求
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: {
                username:username,
                password:password
            },
            success: function (res) {
                // console.log(res)
                if(res.success){
                    alert("登陆成功");
                    location.href = "user.html";
                }else{
                    alert(res.message);
                }
            }
        });
    })
})