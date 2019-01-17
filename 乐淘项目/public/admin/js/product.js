$(function(){
    $.ajax({
        type: "get",
        url: "/product/queryProductDetailList",
        data: {
            page:1,
            pageSize:10
        },
        success: function (res) {
            // console.log(res)
        var html = template("productTpl",res);
        $("#productBox").html(html);
        }
    });

    // 查询二级分类 渲染到下拉菜单
    $.ajax({
        type: "get",
        url: "/category/querySecondCategoryPaging",
        data: {
            page:1,
            pageSize:1   // 不确定有多少总条数,请求两次拿到总条数
        },
        success: function (res) {
            // console.log(res)
            $.ajax({
                type: "get",
                url: "/category/querySecondCategoryPaging",
                data: {
                    page:1,
                    pageSize:res.total
                },
                success: function (res) {
                    console.log(res)
                var html = template("secondTpl",res);
                $("#secondBox").html(html);
                }
            });
        }
    });

    // 定义空数组存储图片地址
    var imageArray = [];
    // 文件上传  添加data-url   multiple可以传多个文件
    $('#fileUpload').fileupload({
	    dataType: 'json',
	    done: function (e, data) {
            imageArray.push(data.result);
	    }
    });
    
    // 添加点击事件
    $("#addProduct").on("click",function(){
        var proName = $.trim($("[name = proName]").val());
        var oldPrice = $.trim($("[name = oldPrice]").val());
        var price = $.trim($("[name = price]").val());
        var size = $.trim($("[name = size]").val());
        var proDesc = $.trim($("[name = proDesc]").val());
        var num = $.trim($("[name = num]").val());
        var brandId = $.trim($("[name = brandId]").val());
        // 判断

        // 发送请求
        $.ajax({
            type: "post",
            url: "/product/addProduct",
            data: {
                proName:proName,
                oldPrice:oldPrice,
                price:price,
                size:size,
                proDesc:proDesc,
                num:num,
                brandId:brandId,
                statu:1,
                pic:imageArray
            },
            success: function (res) {
                // console.log(res)
                if(res.success){
                    location.reload();
                }
            }
        });
    })
})