//  进入页面就发送同步请求判断是否登录
$.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    async: false,
    success: function (res) {
        // console.log(res)
        if (!res.success) {
            location.href = "login.html";
        }
    }
});

$(function () {
    // 获取退出按钮 实现退出功能
    $(".login_out_bot").on("click", function () {
        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            success: function (res) {
                // console.log(res)
                if (res.error && res.error == 400) {
                    if (confirm("是否退出")) {
                        location.href = "login.html";
                    }
                }
            }
        });
    })

    //菜单
    /*导航菜单*/
    $('.navbar-brand').on('click', function () {
        $('.left').toggle();
        $('.right').toggleClass('menu');
    });


    var navLi = $('.navs li')

    navLi.on('click', function () {

        $(this).find('ul').slideToggle();

    });

})