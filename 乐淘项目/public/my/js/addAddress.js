$(function () {

    // 获取url传过来的参数
    var isEdie = Number(getParamsByUrl(location.href, "isEdie"));
    // console.log(isEdie);
    if (isEdie) {
        // 编辑
        // 获取本地存储
        if (localStorage.getItem("key")) {
            var key = JSON.parse(localStorage.getItem("key"));
            //   console.log(key);
            // 获取本地存储的id
            var id = key.id;
            //   console.log(id);
            // 使用模板引擎渲染数据
            var html = template("form", key)
            // console.log(html)
            $(".oldForm").html(html);
        }
    } else {
        // 添加
        var html = template("form", {});
        // console.log(html);
        $(".oldForm").html(html);
    }

    // 使用插件实现三级联动 添加事件 设置属性只读
    var picker = new mui.PopPicker({
        layer: 3
    }); // 显示3条

    // 添加数据
    picker.setData(cityData);
    // 点击 city显示三级联动
    $(".oldForm").on("tap", "#city", function () {
        picker.show(function (selectItems) {
            // console.log(selectItems);
            var pro = selectItems[0].text;
            var city = selectItems[1].text;
            var dis = selectItems[2].text;
            // console.log(pro,city,dis);
            $("#city").val(pro + city + dis);
        });
    })
    // 添加事件获取表单中的值
    $("#btn").on("tap", function () {
        var username = $.trim($("[name = username]").val());
        var postCode = $.trim($("[name = postCode]").val());
        var city = $.trim($("[name = city]").val());
        var detail = $.trim($("[name = detail]").val());

        // 进行验证
        if (!username) {
            mui.toast("请输入收货人姓名");
            return;
        }
        if (!postCode) {
            mui.toast("请输入邮编");
            return;
        }
        if (!city) {
            mui.toast("请选择城市");
            return;
        }
        if (!detail) {
            mui.toast("请输入地址");
            return;
        }

        var data = {
            recipients: username,
            postcode: postCode,
            address: city,
            addressDetail: detail
        }
        if (isEdie) {
            var url = "/address/updateAddress";
            data.id = id;
        } else {
            var url = "/address/addAddress";
        }

        // 发送ajax请求
        $.ajax({
            type: "post",
            url: url,
            data: data,
            success: function (res) {
                // console.log(res);
                // 提示成功 跳转收货地址页面
                if (res.success) {
                    if (isEdie) {
                        mui.toast("修改成功");
                    } else {
                        mui.toast("添加成功");
                    }

                    setInterval(() => {
                        location.href = "./adress.html";
                    }, 2000);
                }
            }
        });
    })
})