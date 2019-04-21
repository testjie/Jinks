!function ($) {
    // 页面加载时加载列表
    jQuery(function () {
        $(function () {
            var id = $("#alid").val();
            getAritcleList(id);
        });
    })
}(window.jQuery);


// 分页
var getAritcleList = function (p) {
    $.ajax({
        type: 'get',
        url: '/getArticleList?p=' + p,
        success: function (str) { //返回json结果
            // 成功和未登录都进行跳转
            if (str.code == 200) {
                addArticleList(str.data); // 加载文章列表
                addArticlePaging(str);
            } else {
                alert(str.msg);
            }

        },
        fail: function (err, status) {
            console.log(err);
        }
    });
};


// 加载文章列表
var addArticleList = function (str) {
    for (var i = 0; i < str.data.length; i++) {
            var article = "                        <div id=\""+str.data[i].id+"\"\n" +
                "                             class=\"clear post-"+str.data[i].id+" post type-post status-publish format-standard has-post-thumbnail hentry category-finance tag-21 tag-25 tag-27\">\n" +
                "\n" +
                "\n" +
                "                            <a target=\"_blank\" class=\"thumbnail-link\"\n" +
                "                               href=\"goArticleDetails?id=" + str.data[i].id + "\">\n" +
                "                                <div class=\"thumbnail-wrap\">\n" +
                "                                    <img width=\"300\" height=\"193\"\n" +
                "                                         src=\"" + str.data[i].image + "\"\n" +
                "                                         class=\"attachment-iux_list_thumb size-iux_list_thumb wp-post-image\" alt=\"\">\n" +
                "                                </div><!-- .thumbnail-wrap -->\n" +
                "                            </a>\n" +
                "\n" +
                "\n" +
                "                            <header class=\"entry-header\">\n" +
                "\n" +
                "\t\t<span class=\"entry-category\">\n" +
                "\t\t\t<a target=\"_blank\" href=\"https://www.zhutibaba.com/demo/iux/finance \">财经</a>\n" +
                "\t\t</span><!-- .entry-category -->\n" +
                "\n" +
                "\n" +
                "                                <h2 class=\"entry-title\"><a target=\"_blank\"\n" +
                "                                                           href=\"goArticleDetails?id=" + str.data[i].id + "\" >" + str.data[i].title + "\n" +
                "                                </h2>\n" +
                "                            </header>\n" +
                "\n" +
                "                            <div class=\"entry-overview \t\">\n" +
                "\n" +
                "\n" +
                "                                <div class=\"entry-meta\">\n" +
                "\n" +
                "\n" +
                "\t\t\t<span class=\"entry-date\">\n" +
                "\t\t\t\t"+str.data[i].createtime+"\t\t\t</span><!-- .entry-date -->\n" +
                "\n" +
                "\n" +
                "                                    <span class=\"entry-like\">\n" +
                "\t\t\t\t\t<span class=\"sl-wrapper\"><a\n" +
                "                            href=\"https://www.zhutibaba.com/demo/iux/wp-admin/admin-ajax.php?action=process_simple_like&amp;post_id=392&amp;nonce=cb67874993&amp;is_comment=0&amp;disabled=true\"\n" +
                "                            class=\"sl-button sl-button-392\" data-nonce=\"cb67874993\" data-post-id=\"392\"\n" +
                "                            data-iscomment=\"0\" title=\"点赞这篇文章\"><span class=\"sl-count\"><i class=\"fa fa-thumbs-o-up\"></i> " + str.data[i].studycount + "<em>学习</em></span></a><span\n" +
                "                            class=\"sl-loader\"></span></span>\t\t\t\t</span><!-- .entry-like -->\n" +
                "\n" +
                "\n" +
                "                                    <span class=\"entry-views\"><a href=\"goArticleDetails?id=" + str.data[i].id + "\" ><i\n" +
                "                                            class=\"flaticon-eye\"></i> " + str.data[i].readcount + "<em>阅读</em></a></span>\n" +
                "\n" +
                "                                    <span class=\"entry-comment\"><a\n" +
                "                                            href=\"goArticleDetails?id=" + str.data[i].id + "\"\n" +
                "                                            class=\"comments-link\"><i\n" +
                "                                            class=\"flaticon-chat-comment-oval-speech-bubble-with-text-lines\"></i> " + str.data[i].commentcount + "<em>评论</em></a></span>\n" +
                "\n" +
                "                                </div><!-- .entry-meta -->\n" +
                "\n" +
                "                                <div class=\"entry-summary\">\n" +
                "                                    <p>" + str.data[i].summary + "</p>\n" +
                "                                </div><!-- .entry-summary -->\n" +
                "\n" +
                "\n" +
                "                            </div><!-- .entry-overview -->\n" +
                "\n" +
                "                        </div><!-- #post-392 -->\n";

        $("#articleList").append(article);
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
    baseStr = baseStr + "</div>";

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