$(function () {
    // 给注册按钮添加点击事件
    $("#btn").on("tap", function () {
        //    属性选择器 获取表单中的值
        var username = $.trim($("[name = username]").val());
        var mobile = $.trim($("[name = mobile]").val());
        var password = $.trim($("[name = password]").val());
        var repepassword = $.trim($("[name = repepassword]").val());
        var vCode = $.trim($("[name = vCode]").val());

        // 对表单中的值进行判断
        if (!username) {
            mui.toast("请输入用户名");
            return;
        }
        if (mobile.length != 11) {
            mui.toast("请输入合法的手机号");
            return;
        }
        if (password !=repepassword ) {
            mui.toast("两次输入密码不一致");
            return;
        }
        if (vCode.length != 6) {
            mui.toast("请输入验证码");
            return;
        }

        $.ajax({
            url:"/user/register",
            type:"post",
            data:{
                username:username,
                password:password,
                mobile:mobile,
                vCode:vCode
            },
            success:function(res){
                 console.log(res);
                mui.toast("注册成功");

                setInterval(function(){
                    location.href = "login.html";
                },2000)
            }
        })
    })

    // 获取验证码
    $(".vCode").on("tap",function(){
        $.ajax({
            url:"/user/vCode",
            type:"get",
            success:function(res){
                console.log(res.vCode);
            }
        })
    })

})