$(function(){
    // 区域滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    // 请求分类页左边导航内容
    // 一级分类
    $.ajax({
        url:"/category/queryTopCategory",
        type:"get",
        success:function(res){
            // console.log(res);

        var html = template("c_left",{res:res.rows});

        $(".links").html(html);
        // console.log(html)
        
        // 如果一级分类有数据
        if(res.rows.length){
            // 给第一个一级分类添加样式
            $(".links").find("a").eq(0).addClass("active");
            // 获取第一个一级分类的id
            var id = res.rows[0].id;
            // 根据id获取二级分类的数据
            getCategory(id); 
        }
        }
    })

    // 二级分类
    /*  1.给一级分类添加点击事件
        2.给一级分类添加自定义属性
        3.ajax请求获取数据,传参数id
        4.使用模板引擎渲染数据
        5.如果没有数据,渲染暂无数据 */

    $(".links").on("click","a",function(){
       var id = $(this).attr("date-id");
    //    console.log(id);
    // 当前a标签添加样式
       $(this).addClass("active").siblings().removeClass("active");
        // 根据id获取二级分类的数据
        getCategory(id); 
    })

    // 根据一级分类id获取二级分类数据
    function getCategory(id){
        $.ajax({
            url:"/category/querySecondCategory",
            type:"get",
            data:{
                id:id
            },
            success:function(res){
                // console.log(res);
            
            var html = template("c_right",res);
            $(".brand-list").html(html);
            }
        })
    }
})