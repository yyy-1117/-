$(function () {
    // 当前页
    var page = 1;
    // 每页条数
    var pageSize = 5;
    // 总条数
    var total = 0;

    // 进入页面渲染数据
    getAjax();

    // 下一页
    $("#nextBtn").on("click",function(){
        page++;
        if(page > total){
            page = total;
            alert("已到最后一页")
        }
        getAjax();
    })

    
    // 上一页
    $("#prevBtn").on("click",function(){
        page--;
        if(page < 1){
            page = 1;
            alert("已到第一页")
        }
        getAjax();
    })

    function getAjax() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (res) {
                // console.log(res)
                total = Math.ceil(res.total / pageSize)
                var html = template("categorySecondTpl", res);
                $("#categorySecondBox").html(html);
            }
        });
    }

    var total = 0;
    // 获取一级分类
    $.ajax({
        type: "get",
        url: "/category/queryTopCategoryPaging",
        data: {
            page:1,
            pageSize:1  // 不确定有多少条,发送2次请求 获取总条数
        },
        success: function (res) {
            // console.log(res)
            $.ajax({
                type: "get",
                url: "/category/queryTopCategoryPaging",
                data: {
                    page:1,
                    pageSize:total
                },
                success: function (res) {
                    // console.log(res)
                var html = template("categoryFirstTpl",res);
                $("#categoryFirstBox").html(html);
                }
            });
        }
    });

    // 图片地址
    var previewImg ="";
    // 文件上传
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            // console.log(data);
        previewImg = data.result.picAddr;   // 图片地址
        $("#preview").attr("src",previewImg);  // 展示所选图片
        }
    });

    // 发送请求保存数据
    $("#save").on("click",function(){
        // 获取用户数据
        var categoryId = $.trim($("[name = categoryId]").val());
        var brandName = $.trim($("[name = brandName]").val());
        // 判断
        if(categoryId  == -1){
            alert("请选择分类");
            return;
        }
        if(!brandName){
            alert("请输入商品名称");
            return;
        }
        if(!previewImg){
            alert("请选择图片");
            return;
        }

        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: {
                brandName:brandName,
                categoryId:categoryId,
                brandLogo:previewImg,
                hot:0
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