$(function(){
    // 添加点击事件
    $("#btn").on("tap",function(){
        // 获取表单的值
        var originPass = $.trim($("[name = originPass]").val());
        var newPass = $.trim($("[name = newPass]").val());
        var confirmNewPass = $.trim($("[name = confirmNewPass]").val());
        var vCode = $.trim($("[name = vCode]").val());

        // 判断
        if(!originPass){
            mui.toast("请输入密码");
            return;
        }
        if( newPass != confirmNewPass){
            mui.toast("两次输入密码不同");
            return;
        }
        // if( vCode.length != 6){
        //     mui.toast("请输入验证码");
        //     return;
        // }
        $.ajax({
            url:"/user/updatePassword",
           
            type:"post",
            data:{
                oldPassword:originPass,
                newPassword:newPass,
                vCode:vCode
            },
            success:function(res){
                console.log(res);
                if(res.success){
                    mui.toast("修改成功");
                    setInterval(function(){
                        location.href = "./login.html";
                    },2000)
                }
            }
        })
    })

    // 获取验证码
    $(".vCode").on("tap",function(){
        $.ajax({
            url:"/user/vCodeForUpdatePassword",
            type:"get",
            success:function(res){
                console.log(res.vCode);
            }
        })
    })
})