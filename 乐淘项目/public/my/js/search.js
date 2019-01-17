$(function(){
    // 搜索按钮添加点击事件
    $("#search-btn").on("click",function(){
        // 获取用户输入的关键字
        var keyword = $(this).siblings("input").val();
        // 判断用户是否输入关键字
        if(keyword){
            location.href="search-result.html?keyword=" +keyword;
            // console.log("有数据");
            // 将关键字添加到数组中
            arr.push(keyword);
            // 将数组转换成字符串
            var keyArr = JSON.stringify(arr);
            // 将关键字存储到本地存储
            localStorage.setItem('key',keyArr);    
        }else{
            alert("请输入关键字");
            return;
        }
    })

    // 准备一个空数组
    var arr = [];
    // 页面一加载进来就获取本地存储的数据
    if(localStorage.getItem("key")){
        // 获取本地存取的数据 转换成数组存放到数组中
        arr = JSON.parse(localStorage.getItem("key"));
        // console.log(arr);
        // 使用模板引擎 渲染数组
        var html = template("lis",{res:arr});
        // console.log({res:arr});
        $("#ul").html(html);
    }

    // 给清空历史添加点击事件
    $("#clearBtn").on("click",function(){
        // 清空本地存储
        localStorage.removeItem("key");
        // 清空历史列表
        $("#ul").html("");
       
    })
})