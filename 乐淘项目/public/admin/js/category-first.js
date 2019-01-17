$(function () {
    // 初始页
    var page = 1;
    // 每页显示条数
    var pageSize = 5;
    // 总条数
    var total = 0;
    // 进入页面就发送请求渲染数据
    getAjax();

    // 下一页
    $("#next").on("click", function () {
        page++;
        if (page > total) {
            page = total;
            alert("已到最后一页")
        }
        getAjax();
    })
    // 上一页
    $("#prev").on("click", function () {
        page--;
        if (page < 1) {
            page = 1;
            alert("已到第一页")
        }
        getAjax();
    })

    function getAjax() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (res) {
                // console.log(res)
                total = Math.ceil(res.total / pageSize); // 总页数
                var html = template("categoryFirstTpl", res);
                $("#categoryFirstBox").html(html);
            }
        });
    }

    //添加分类
    $("#save").on("click",function(){
        // 获取表单中的值
        var categoryName = $.trim($("[name =categoryName]").val());
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: {
                categoryName:categoryName
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