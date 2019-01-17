$(function () {
    // 添加点击事件
    $("#btn").on("tap", function () {
        // 属性选择器
        var username = $.trim($("[name = username]").val());
        var password = $.trim($("[name = password]").val());

        // 判断
        if (!username) {
            mui.toast("请输入用户名");
            return;
        }
        if (!password) {
            mui.toast("请输入密码");
            return;
        }
        $.ajax({
            url: "/user/login",
            type: "post",
            data: {
                username: username,
                password: password
            },
            success: function (res) {
                // console.log(res);
                if (res.error != 403) {
                    mui.toast("登录成功");

                    setInterval(function () {
                        location.href = "user.html";
                    }, 2000)
                }else{
                    mui.toast("登录失败");
                }
            }
        })
    })
})