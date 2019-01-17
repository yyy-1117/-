// 截取URL字符串
// var key= new URLSearchParams(location.search).get("keyword");
// location.search.substr(location.search.indexOf("?")+1).split("=");
var key = getParamsByUrl(location.href, 'keyword');
// console.log(key);
// 当前页
var page = 1;
// 页面中的数据
var html = "";
// 价格升序
var priceSort = 1;
// 销量升序
var num = 1;

var This = null;

var orden = {};
$(function () {

    mui.init({
        pullRefresh: {
            container: '#refreshContainer', //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50, //可选.默认50.触发上拉加载拖动距离
                auto: true, //可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getAjax //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    //   价格排序
    $("#priceSort").on("tap", function () {
        // 更改价格排序的条件
        priceSort = priceSort == 1 ? 2 : 1;
        orden = {price : priceSort};
        // 对之前的各种配置进行初始化
        html = "";
        page = 1;
        mui('#refreshContainer').pullRefresh().refresh(true);

        // 重新请求数据
        getAjax();
    })

     //   价格排序
     $("#num").on("tap", function () {
        // 更改价格排序的条件
        num = num == 1 ? 2 : 1;
        orden = {num:num};
        // 对之前的各种配置进行初始化
        html = "";
        page = 1;
        mui('#refreshContainer').pullRefresh().refresh(true);

        // 重新请求数据
        getAjax();
    })
})


// ajax请求封装
function getAjax() {
    if (!This) {
        This = this;
    }
    // 发送ajax请求 传入接口文档需要的参数
    $.ajax({
        url: "/product/queryProduct",
        type: "get",
        data: $.extend(    // extend  对象合并
            {
                page: page++,
                pageSize: 3,
                proName: key,
            },orden ),
        success: function (res) {
            console.log(res);
            if (res.data.length > 0) {
                html += template("lis", res);
                $("#ul").html(html);

                // 告诉上拉加载组件当前数据加载完毕
                This.endPullupToRefresh(false);
            } else {

                // 告诉上拉加载组件当前数据加载完毕
                This.endPullupToRefresh(true);
            }
        }
    })
}