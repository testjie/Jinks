!function ($) {
    // 页面加载时加载列表
    jQuery(function () {
        $(function () {
            getCarousel();              // 首页轮播图
            getArticleCategories();     // 文章类表列表
        });
    })
}(window.jQuery);


// 获取文件分类
var getArticleCategories = function () {
    $.ajax({
        type: 'get',
        url: '/getArticleCategories',
        success: function (str) { //返回json结果
            // 成功和未登录都进行跳转
            if (str.code == 200) {
                for (var i = 0; i < str.data.length; i++) {
                    var categories = "<div class=\"zhuanti-list-item ht_custom_grid_1_4\"><a target=\"_blank\" class=\"thumbnail-link\"\n" +
                        " href=https://www.zhutibaba.com/demo/iux/sports>\n" +
                        " <div class=\"thumbnail-wrap\"><img\n" +
                        " src=\""+str.data[i].img_url+"\"\n" +
                        " alt=\""+str.data[i].name+"\"/></div>\n" +
                        " </a>\n" +
                        "<h3 class=\"zhuanti-title\"><a target=\"_blank\"\n" +
                        " href=https://www.zhutibaba.com/demo/iux/sports>"+str.data[i].name+"</a></h3></div>"
                    $("#articleCategories").append(categories);
                }
            } else {
                alert(str.msg);
            }
        },
        fail: function (err, status) {
            console.log(err);
        }
      });
    };

// 获取轮播图
    var getCarousel = function () {

        $.ajax({
            type: 'get',
            url: '/getCarousel',
            success: function (str) { //返回json结果
                // 成功和未登录都进行跳转
                if (str.code == 200) {
                    for (var i = 0; i < str.data.length; i++) {
                        var carousel = "<li class=\"featured-slide hentry\" style='width: 800px; '>\n" +
                            "                        <a class=\"thumbnail-link\" href=\"" + str.data[i].content + "\">\n" +
                            "                            <div class=\"thumbnail-wrap\">\n" +
                            "                                <img width=\"800\" height=\"333\"\n" +
                            "                                     src=\"" + str.data[i].img_url + "\"\n" +
                            "                                     class=\"attachment-iux_featured_large_thumb2 size-iux_featured_large_thumb2 wp-post-image\"\n" +
                            "                                     alt=\"\"/></div><!-- .thumbnail-wrap -->\n" +
                            "                        </a>\n" +
                            "\n" +
                            "                        <div class=\"entry-header clear\">\n" +
                            "                            <h2 class=\"entry-title\"><a target=\"_blank\"\n" +
                            "                                                       href=\"" + str.data[i].content + "\">" + str.data[i].title + "</a>\n" +
                            "                            </h2>\n" +
                            "                        </div><!-- .entry-header -->\n" +
                            "                        <div class=\"gradient\"></div>\n" +
                            "                    </li><!-- .featured-slide .hentry -->\n";
                        $("#carouselList").append(carousel);
                    }
                } else {
                    alert(str.msg);
                }

            },
            fail: function (err, status) {
                console.log(err);
            }
        });
    };
