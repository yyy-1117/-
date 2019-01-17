$(function () {
    // 库存
    var Stock = null;
    // 用户选择的数量
    var num = 1;
    // 获取用户选中的尺码
    var size = null;
    var id = getParamsByUrl(location.href, 'id');
    // console.log(id);
    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: {
            id: id
        },
        success: function (res) {
            // console.log(res);
            // 获取库存
            Stock = res.num;
            var html = template("detail", res)
            // console.log(html) 
            $("#pro").html(html);
            // 初始化轮播图
            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    });

    // 给尺码添加事件  动态的都必须事件委托
    $("#pro").on("tap", ".size span", function () {
        $(this).addClass("active").siblings("span").removeClass("active");
        size = $(this).html();
    })

    // 点击 + 号 累加
    $("#pro").on("tap", "#increase", function () {
        num = $("#inp").val();
        num++;
        $("#inp").val(num);
        if (num > Stock) {
            num = Stock;
        }
        $("#inp").val(num);
    })

    // 点击 - 号 递减
    $("#pro").on("tap", "#reduce", function () {
        num = $("#inp").val();
        num--;
        $("#inp").val(num);
        if (num < 1) {
            num = 1;
        }
        $("#inp").val(num);
    })

    // 添加到购物车
    $("#pro").on("tap", "#addCart", function () {
        //    判断用户是否选中尺码
        if (!size) {
            mui.toast("请选择尺码");
            return;
        }
        $.ajax({
            type: "post",
            url: "/cart/addCart",
            data: {
                productId:id,
                num:num,
                size:size
            },
            success: function (res) {
                if(res.success){
                    mui.confirm("加入成功是否跳转到购物车",function(e){
                        if(e.index){
                            setTimeout(function(){
                                location.href = "cart.html";
                            },1000)
                        }
                    })
                }
            }
        });


    })
})