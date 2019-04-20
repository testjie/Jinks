!function ($) {
    // 页面加载时加载列表
    jQuery(function () {
        $(function () {
            getCarousel();              // 首页轮播图
            getArticleCategories();     // 文章类表列表
            getAritcles();              // 文章列表
        });
    })
}(window.jQuery);


// 获取文章分类
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
                        " src=\"" + str.data[i].img_url + "\"\n" +
                        " alt=\"" + str.data[i].name + "\"/></div>\n" +
                        " </a>\n" +
                        "<h3 class=\"zhuanti-title\"><a target=\"_blank\"\n" +
                        " href=https://www.zhutibaba.com/demo/iux/sports>" + str.data[i].name + "</a></h3></div>"
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
                    var carousel = "<li class=\"featured-slide hentry\">\n" +
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

// 获取文章列表
var getAritcles = function () {

    $.ajax({
        type: 'get',
        url: '/getArticles',
        success: function (str) { //返回json结果
            // 成功和未登录都进行跳转
            if (str.code == 200) {
                for (var i = 0; i < str.data.length; i++) {
                    var article = "                        <div id=\""+str.data[i].id+"\"\n" +
                        "                             class=\"clear post-"+str.data[i].id+" post type-post status-publish format-standard has-post-thumbnail hentry category-tech tag-25 tag-26 tag-27\">\n" +
                        "                            <a target=\"_blank\" class=\"thumbnail-link\"\n" +
                        "                               href=\"goArticleDetails?id="+str.data[i].id+"\">\n" +
                        "                                <div class=\"thumbnail-wrap\">\n" +
                        "                                    <img width=\"300\" height=\"193\"\n" +
                        "                                         src=\""+str.data[i].image+"\"\n" +
                        "                                         class=\"attachment-iux_list_thumb size-iux_list_thumb wp-post-image\" alt=\"\"/>\n" +
                        "                                </div><!-- .thumbnail-wrap -->\n" +
                        "                            </a>\n" +
                        "                            <header class=\"entry-header\">\n" +
                        "\t\n" +
                        "\t\t<span class=\"entry-category\">\n" +
                        "\t\t\t<a target=\"_blank\" href=\"https://www.zhutibaba.com/demo/iux/tech \">科技</a>\n" +
                        "\t\t</span><!-- .entry-category -->\n" +
                        "                                <h2 class=\"entry-title\"><a target=\"_blank\"\n" +
                        "                                                          href=\"goArticleDetails?id="+str.data[i].id+"\" >"+str.data[i].title+"\n" +
                        "                            </header>\n" +
                        "                            <div class=\"entry-overview \t\">\n" +
                        "                                <div class=\"entry-meta\">\n" +
                        "\t\t\t<span class=\"entry-date\">\n" +
                        "\t\t\t\t"+str.data[i].createtime+"\t\t\t</span><!-- .entry-date -->\n" +
                        "                                    <span class=\"entry-like\">\n" +
                        "\t\t\t\t\t<span class=\"sl-wrapper\"><a\n" +
                        "                            href=\"https://www.zhutibaba.com/demo/iux/wp-admin/admin-ajax.php?action=process_simple_like&post_id=582&nonce=2eb9326105&is_comment=0&disabled=true\"\n" +
                        "                            class=\"sl-button sl-button-582\" data-nonce=\"2eb9326105\" data-post-id=\""+str.data[i].id+"\"\n" +
                        "                            data-iscomment=\"0\" title=\"点赞这篇文章\"><span class=\"sl-count\"><i class=\"fa fa-thumbs-o-up\"></i> "+str.data[i].studycount+"<em>学习</em></span></a><span\n" +
                        "                            class=\"sl-loader\"></span></span>\t\t\t\t</span><!-- .entry-like -->\n" +
                        "                                    <span class=\"entry-views\"><a href=\"goArticleDetails?id="+str.data[i].id+"\" ><i\n" +
                        "                                            class=\"flaticon-eye\"></i> "+str.data[i].readcount+"<em>阅读</em></a></span>\n" +
                        "                                    <span class=\"entry-comment\"><a\n" +
                        "                                            href=\"goArticleDetails?id="+str.data[i].id+"\"\n" +
                        "                                            class=\"comments-link\"><i\n" +
                        "                                            class=\"flaticon-chat-comment-oval-speech-bubble-with-text-lines\"></i> "+str.data[i].commentcount+"<em>评论</em></a></span>\n" +
                        "                                </div><!-- .entry-meta -->\n" +
                        "                                <div class=\"entry-summary\">\n" +
                        "                                    <p>"+str.data[i].summary+"</p>\n" +
                        "                                </div><!-- .entry-summary -->\n" +
                        "                            </div><!-- .entry-overview -->\n" +
                        "                        </div><!-- #post-582 -->\n"
                    $("#artcleList").append(article);
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