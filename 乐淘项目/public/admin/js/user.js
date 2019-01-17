$(function(){
    // 当前页
    var page =1;
    $.ajax({
        type: "get",
        url: "/user/queryUser",
        data: {
            page:page++,
            pageSize:3
        },
        success: function (res) {
            // console.log(res)
        var html = template("userTpl",res)
        // console.log(html)
        $("#user-box").html(html);
        }
    });

    // 更改用户状态
    $(".body").on("click",".edit-btn",function(){
        var id = $(this).attr("data-id");
        var isDelete = Number($(this).attr("data-isDelete")) ? 0 : 1;
        $.ajax({
            type: "post",
            url: "/user/updateUser",
            data: {
                id:id,
                isDelete:isDelete
            },
            success: function (res) {
                console.log(res);
                if(res.success){
                    location.reload();
                }
            }
        });
        
    })
})