!function ($) {

    // 页面加载时加载列表
    jQuery(function () {

        // 1. 获取笔记本信息
        $(function () {
            getCarousel();
        });

    })


}(window.jQuery);


// 获取轮播图
var getCarousel = function () {

    $.ajax({
        type: 'get',
        url: '/getCarousel',
        success: function (str) { //返回json结果
            // 成功和未登录都进行跳转
            if (str.code == 200) {
                for (var i=0;i<str.data.length; i++) {
                    alert(str.data["content"]);
                    var carousel = "<li class=\"featured-slide hentry\">\n" +
                        "                        <a class=\"thumbnail-link\" href=\"" + str.data.content + "\">\n" +
                        "                            <div class=\"thumbnail-wrap\">\n" +
                        "                                <img width=\"600\" height=\"350\"\n" +
                        "                                     src=\"" + str.data.img_url + "\"\n" +
                        "                                     class=\"attachment-iux_featured_large_thumb2 size-iux_featured_large_thumb2 wp-post-image\"\n" +
                        "                                     alt=\"\"/></div><!-- .thumbnail-wrap -->\n" +
                        "                        </a>\n" +
                        "\n" +
                        "                        <div class=\"entry-header clear\">\n" +
                        "                            <h2 class=\"entry-title\"><a target=\"_blank\"\n" +
                        "                                                       href=\"" + str.data.content + "\">"+ str.data.title+"</a>\n" +
                        "                            </h2>\n" +
                        "                        </div><!-- .entry-header -->\n" +
                        "                        <div class=\"gradient\"></div>\n" +
                        "                    </li><!-- .featured-slide .hentry -->\n";
                    $("#carouselList").append(carousel);
                }
            }else {
                alert(str.msg);
            }

        },
        fail: function (err, status) {
            console.log(err);
        }
    });
};
