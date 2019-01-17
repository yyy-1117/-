$(function(){
    // 存储用户信息
    var userinfo = null;
    // 页面加载进来就获取用户地址信息
    // 渲染数据
    $.ajax({
        url:"/address/queryAddress",
        type:"get",
        success:function(res){
            // console.log(res);
            userinfo = res;
            var html = template("lis",{data:res})
            // console.log(html);
            $("#ul").html(html);
        }
    })

    // 删除按钮添加轻敲事件 事件委托
    $("#ul").on("tap","#delbtn",function(){
        // 获取 li标签
        var li =this.parentNode.parentNode;
        // console.log(li);
    //    获取自定义属性
    var id = $(this).attr("data-id");
        // console.log(id);
        //    给予提示
        mui.confirm("是否删除",function(e){
            // console.log(e)
            if(e.index){
                // 确认删除 发送请求
                $.ajax({
                    type: "post",
                    url: "/address/deleteAddress",
                    data: {
                        id:id
                    },
                    success: function (res) {
                        // console.log(res)
                        if(res.success){
                            mui.toast("删除成功");
                            location.reload();
                        }
                    }
                });
               
            }else{
                // 取消删除  还原li标签
                mui.swipeoutClose(li);
            }
        });
    })

    // 编辑按钮添加事件 事件委托
    $("#ul").on("tap","#addbtn",function(){
        // 获取自定义属性
        var id = $(this).attr("data-id");
        // 遍历用户数据 匹配id
        // console.log(userinfo);
        for(var i = 0;i<userinfo.length;i++){
            if(userinfo[i].id == id){
                // console.log(userinfo[i])
                // 将数据存储到本地存储中
                var user = JSON.stringify(userinfo[i]);
                // console.log(user);
                localStorage.setItem("key",user);
                break;
            }
        }
        // 跳转到修改页面
        location.href = 'addAddress.html?isEdie=1';
    })
})