!function ($) {
    // 页面加载时加载列表
    jQuery(function () {
        $(function () {
            getCarousel();              // 首页轮播图
            getArticleCategories();     // 文章类表列表
            // getAritcles();              // 文章列表
            getAritcleList();
        });
    })

    // 页面到底部时，就触发此事件
    $(window).scroll(function () {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            getAritcleList();
            // setTimeOut(addArticle(), d)
        }
    });

}(window.jQuery);

var showLoading = function () {
    $('#scroller-status').show();
    $('#loading').show();
};

var showFinshed = function () {
    $('#scroller-status').show();
    $('#finshed').show();
};

var hiddenLoading = function () {
    $('#scroller-status').hide();
    $('#loading').hide();
};

var hiddenFinshed = function () {
    $('#scroller-status').hide();
    $('#finshed').hide();
};

var loadDoneLoading = function () {
    $('#scroller-status').show();
    $('#loadDone').show();
};

var loadDoneFinshed = function () {
    $('#scroller-status').hide();
    $('#loadDone').hide();
};

// 滑动添加事件
var addArticle = function (id) {
    for(var a=1; a<10; a++){
      var article = "<div id=\"post-582\" class=\"clear post-582 post type-post status-publish format-standard has-post-thumbnail hentry category-tech tag-25 tag-26 tag-27\">\t\n" +
          "\n" +
          "\t\n" +
          "\t\t\t\t\t<a target=\"_blank\" class=\"thumbnail-link\" href=\"https://www.zhutibaba.com/demo/iux/582.html\">\n" +
          "\t\t\t\t<div class=\"thumbnail-wrap\">\n" +
          "\t\t\t\t\t\t<img width=\"300\" height=\"193\" src=\"https://www.zhutibaba.com/demo/iux/wp-content/uploads/sites/13/2018/07/iphone9-300x193.jpg\" class=\"attachment-iux_list_thumb size-iux_list_thumb wp-post-image\" alt=\"\">\t\t\t\t</div><!-- .thumbnail-wrap -->\n" +
          "\t\t\t</a>\n" +
          "\t\t\n" +
          "\t\n" +
          "\t<header class=\"entry-header\">\n" +
          "\t\n" +
          "\t\t<span class=\"entry-category\">\n" +
          "\t\t\t<a target=\"_blank\" href=\"https://www.zhutibaba.com/demo/iux/tech \">科技</a> \t\n" +
          "\t\t</span><!-- .entry-category -->\n" +
          "\n" +
          "\t\n" +
          "\t<h2 class=\"entry-title\"><a target=\"_blank\" href=\"https://www.zhutibaba.com/demo/iux/582.html\">苹果新品iPhone 9即将发布 颜值和配置有惊喜</a></h2>\n" +
          "\t</header>\n" +
          "\t\n" +
          "\t<div class=\"entry-overview \t\">\n" +
          "\n" +
          "\t\t\n" +
          "\t\t<div class=\"entry-meta\">\n" +
          "\n" +
          "\t\t\n" +
          "\t\t\t<span class=\"entry-date\">\n" +
          "\t\t\t\t2018-11-13\t\t\t</span><!-- .entry-date -->\n" +
          "\n" +
          "\t\t\n" +
          "\t\t\t\t\t\t<span class=\"entry-like\">\n" +
          "\t\t\t\t\t<span class=\"sl-wrapper\"><a href=\"https://www.zhutibaba.com/demo/iux/wp-admin/admin-ajax.php?action=process_simple_like&amp;post_id=582&amp;nonce=da5da17f74&amp;is_comment=0&amp;disabled=true\" class=\"sl-button sl-button-582\" data-nonce=\"da5da17f74\" data-post-id=\"582\" data-iscomment=\"0\" title=\"点赞这篇文章\"><span class=\"sl-count\"><i class=\"fa fa-thumbs-o-up\"></i> 60<em>赞</em></span></a><span class=\"sl-loader\"></span></span>\t\t\t\t</span><!-- .entry-like -->\n" +
          "\n" +
          "\t\t\n" +
          "\t\t\t\t\t<span class=\"entry-views\"><a href=\"https://www.zhutibaba.com/demo/iux/582.html\"><i class=\"flaticon-eye\"></i> 1,493<em>阅读</em></a></span>\n" +
          "\t\t\n" +
          "\t\t\t\t\t<span class=\"entry-comment\"><a href=\"https://www.zhutibaba.com/demo/iux/582.html#comments\" class=\"comments-link\"><i class=\"flaticon-chat-comment-oval-speech-bubble-with-text-lines\"></i> 3<em>评论</em></a></span>\n" +
          "\t\t\n" +
          "</div><!-- .entry-meta -->\n" +
          "\t\t\n" +
          "\t\t\t<div class=\"entry-summary\">\n" +
          "\t\t\t\t<p>来自外媒的报道称，即将上市的iPhone 9在外观和颜值上都做出了巨大的变革，再加上更合理的价格，果粉圈迅速沸腾了。</p>\n" +
          "\t\t\t</div><!-- .entry-summary -->\n" +
          "\n" +
          "\t\t\t\t\t\n" +
          "\t</div><!-- .entry-overview -->\n" +
          "\n" +
          "</div>";
      $("#artcleList").append(article);
    }



}



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
                    var article = "                        <div id=\"" + str.data[i].id + "\"\n" +
                        "                             class=\"clear post-" + str.data[i].id + " post type-post status-publish format-standard has-post-thumbnail hentry category-tech tag-25 tag-26 tag-27\">\n" +
                        "                            <a target=\"_blank\" class=\"thumbnail-link\"\n" +
                        "                               href=\"goArticleDetails?id=" + str.data[i].id + "\">\n" +
                        "                                <div class=\"thumbnail-wrap\">\n" +
                        "                                    <img width=\"300\" height=\"193\"\n" +
                        "                                         src=\"" + str.data[i].image + "\"\n" +
                        "                                         class=\"attachment-iux_list_thumb size-iux_list_thumb wp-post-image\" alt=\"\"/>\n" +
                        "                                </div><!-- .thumbnail-wrap -->\n" +
                        "                            </a>\n" +
                        "                            <header class=\"entry-header\">\n" +
                        "\t\n" +
                        "\t\t<span class=\"entry-category\">\n" +
                        "\t\t\t<a target=\"_blank\" href=\"https://www.zhutibaba.com/demo/iux/tech \">科技</a>\n" +
                        "\t\t</span><!-- .entry-category -->\n" +
                        "                                <h2 class=\"entry-title\"><a target=\"_blank\"\n" +
                        "                                                          href=\"goArticleDetails?id=" + str.data[i].id + "\" >" + str.data[i].title + "\n" +
                        "                            </header>\n" +
                        "                            <div class=\"entry-overview \t\">\n" +
                        "                                <div class=\"entry-meta\">\n" +
                        "\t\t\t<span class=\"entry-date\">\n" +
                        "\t\t\t\t" + str.data[i].createtime + "\t\t\t</span><!-- .entry-date -->\n" +
                        "                                    <span class=\"entry-like\">\n" +
                        "\t\t\t\t\t<span class=\"sl-wrapper\"><a\n" +
                        "                            href=\"https://www.zhutibaba.com/demo/iux/wp-admin/admin-ajax.php?action=process_simple_like&post_id=582&nonce=2eb9326105&is_comment=0&disabled=true\"\n" +
                        "                            class=\"sl-button sl-button-582\" data-nonce=\"2eb9326105\" data-post-id=\"" + str.data[i].id + "\"\n" +
                        "                            data-iscomment=\"0\" title=\"点赞这篇文章\"><span class=\"sl-count\"><i class=\"fa fa-thumbs-o-up\"></i> " + str.data[i].studycount + "<em>学习</em></span></a><span\n" +
                        "                            class=\"sl-loader\"></span></span>\t\t\t\t</span><!-- .entry-like -->\n" +
                        "                                    <span class=\"entry-views\"><a href=\"goArticleDetails?id=" + str.data[i].id + "\" ><i\n" +
                        "                                            class=\"flaticon-eye\"></i> " + str.data[i].readcount + "<em>阅读</em></a></span>\n" +
                        "                                    <span class=\"entry-comment\"><a\n" +
                        "                                            href=\"goArticleDetails?id=" + str.data[i].id + "\"\n" +
                        "                                            class=\"comments-link\"><i\n" +
                        "                                            class=\"flaticon-chat-comment-oval-speech-bubble-with-text-lines\"></i> " + str.data[i].commentcount + "<em>评论</em></a></span>\n" +
                        "                                </div><!-- .entry-meta -->\n" +
                        "                                <div class=\"entry-summary\">\n" +
                        "                                    <p>" + str.data[i].summary + "</p>\n" +
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


// 分页
var getAritcleList = function () {
    showLoading();

    // 如果是最后一页，就不加载了
    if ($("#pageno").val() == "true"){
        hiddenLoading();
        loadDoneLoading();
        return ;
    }

    // 如果不是最后一页，就继续加载
    var p = $("#pageno").val();
    $.ajax({
        type: 'get',
        url: '/getArticleList?p=' + p,
        success: function (str) { //返回json结果
            // 成功和未登录都进行跳转
            if (str.code == 200) {
                addArticleList(str.data); // 加载文章列表
                $("#pageno").val(parseInt(p) + 1);    // 设置当前页数
                hiddenLoading();

                if(p == str.data.total){
                    $("#pageno").val("true");
                    loadDoneLoading();
                }
                // addArticlePaging(str)

            } else {
                alert(str.msg);
            }

        },
        fail: function (err, status) {
            console.log(err);
            hiddenLoading();
        }
    });
};


// 加载文章列表
var addArticleList = function (str) {
    for (var i = 0; i < str.data.length; i++) {
        var article = "                        <div id=\"" + str.data[i].id + "\"\n" +
            "                             class=\"clear post-" + str.data[i].id + " post type-post status-publish format-standard has-post-thumbnail hentry category-tech tag-25 tag-26 tag-27\">\n" +
            "                            <a target=\"_blank\" class=\"thumbnail-link\"\n" +
            "                               href=\"goArticleDetails?id=" + str.data[i].id + "\">\n" +
            "                                <div class=\"thumbnail-wrap\">\n" +
            "                                    <img width=\"300\" height=\"193\"\n" +
            "                                         src=\"" + str.data[i].image + "\"\n" +
            "                                         class=\"attachment-iux_list_thumb size-iux_list_thumb wp-post-image\" alt=\"\"/>\n" +
            "                                </div><!-- .thumbnail-wrap -->\n" +
            "                            </a>\n" +
            "                            <header class=\"entry-header\">\n" +
            "\t\n" +
            "\t\t<span class=\"entry-category\">\n" +
            "\t\t\t<a target=\"_blank\" href=\"https://www.zhutibaba.com/demo/iux/tech \">科技</a>\n" +
            "\t\t</span><!-- .entry-category -->\n" +
            "                                <h2 class=\"entry-title\"><a target=\"_blank\"\n" +
            "                                                          href=\"goArticleDetails?id=" + str.data[i].id + "\" >" + str.data[i].title + "\n" +
            "                            </header>\n" +
            "                            <div class=\"entry-overview \t\">\n" +
            "                                <div class=\"entry-meta\">\n" +
            "\t\t\t<span class=\"entry-date\">\n" +
            "\t\t\t\t" + str.data[i].createtime + "\t\t\t</span><!-- .entry-date -->\n" +
            "                                    <span class=\"entry-like\">\n" +
            "\t\t\t\t\t<span class=\"sl-wrapper\"><a\n" +
            "                            href=\"https://www.zhutibaba.com/demo/iux/wp-admin/admin-ajax.php?action=process_simple_like&post_id=582&nonce=2eb9326105&is_comment=0&disabled=true\"\n" +
            "                            class=\"sl-button sl-button-582\" data-nonce=\"2eb9326105\" data-post-id=\"" + str.data[i].id + "\"\n" +
            "                            data-iscomment=\"0\" title=\"点赞这篇文章\"><span class=\"sl-count\"><i class=\"fa fa-thumbs-o-up\"></i> " + str.data[i].studycount + "<em>学习</em></span></a><span\n" +
            "                            class=\"sl-loader\"></span></span>\t\t\t\t</span><!-- .entry-like -->\n" +
            "                                    <span class=\"entry-views\"><a href=\"goArticleDetails?id=" + str.data[i].id + "\" ><i\n" +
            "                                            class=\"flaticon-eye\"></i> " + str.data[i].readcount + "<em>阅读</em></a></span>\n" +
            "                                    <span class=\"entry-comment\"><a\n" +
            "                                            href=\"goArticleDetails?id=" + str.data[i].id + "\"\n" +
            "                                            class=\"comments-link\"><i\n" +
            "                                            class=\"flaticon-chat-comment-oval-speech-bubble-with-text-lines\"></i> " + str.data[i].commentcount + "<em>评论</em></a></span>\n" +
            "                                </div><!-- .entry-meta -->\n" +
            "                                <div class=\"entry-summary\">\n" +
            "                                    <p>" + str.data[i].summary + "</p>\n" +
            "                                </div><!-- .entry-summary -->\n" +
            "                            </div><!-- .entry-overview -->\n" +
            "                        </div><!-- #post-582 -->\n";
        $("#artcleList").append(article);
    }
};


// 加载翻页控件
var addArticlePaging = function (str) {
    var baseStr = "<h2 class=\"screen-reader-text\">文章导航</h2>";
    // 判断不是首页就加上上一页
    if (str.data.p != 1) {
        prePage = str.data.p - 1;
        baseStr = baseStr + "<div class=\"nav-links\"><a class=\"prev page-numbers\" href=\"/goArticleList?p=" + prePage + "\">上一页</a>";
    }

    // 添加所有下标
    for (var index = 1; index < str.data.total + 1; index++) {
        if (str.data.p == index) {
            if (str.data.p == 1) {
                var pageList = "<a class=\"page-numbers current\" href=\"#\">" + index + "</a>";
            } else {
                var pageList = "<a class=\"page-numbers current\" href=\"/goArticleList?p="+index+"\">" + index + "</a>";
            }
        }
        else {
            if (str.data.p == 1 && index == 1) {
                var pageList = "<a class=\"page-numbers\" href=\"#\">" + index + "</a>";
            } else {
                var pageList = "<a class=\"page-numbers\" href=\"/goArticleList?p="+index+"\">" + index + "</a>";
            }
        }
        baseStr = baseStr + pageList;
    }

    // 判断是否是末页
    if (str.data.p != str.data.total) {
        nextPage = str.data.p + 1;
        baseStr = baseStr + "<a class=\"next page-numbers\" href=\"/goArticleList?p=" + nextPage + "\">下一页</a>";
    }
    $("#articlePaging").append(baseStr);
    // var pageList = "<a class=\"page-numbers\" href=\"https://www.zhutibaba.com/demo/iux/\">1</a>";
    // var paging = "                <h2 class=\"screen-reader-text\">文章导航</h2>\n" +
    //     "                <div class=\"nav-links\"><a class=\"prev page-numbers\" href=\"https://www.zhutibaba.com/demo/iux/\">上一页</a>\n" +
    //     "                    <a class=\"page-numbers\" href=\"https://www.zhutibaba.com/demo/iux/\">1</a>\n" +
    //     "                    <span aria-current=\"page\" class=\"page-numbers current\">2</span>\n" +
    //     "                    <a class=\"page-numbers\" href=\"https://www.zhutibaba.com/demo/iux/page/3\">3</a>\n" +
    //     "                    <span class=\"page-numbers dots\">…</span>\n" +
    //     "                    <a class=\"page-numbers\" href=\"https://www.zhutibaba.com/demo/iux/page/6\">6</a>\n" +
    //     "                    <a class=\"next page-numbers\" href=\"https://www.zhutibaba.com/demo/iux/page/3\">下一页</a></div>"
};