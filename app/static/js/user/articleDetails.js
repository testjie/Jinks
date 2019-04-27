!function ($) {
    // 页面加载时加载列表
    jQuery(function () {
        $(function () {
            var id = $("#aid").val();
            getArticleinfo(id);
        });

        browserBack();
    })
}(window.jQuery);


var browserBack = function () {
    if (window.history && window.history.pushState) {

    $(window).on('popstate', function() {
      var hashLocation = location.hash;
      var hashSplit = hashLocation.split("#!/");
      var hashName = hashSplit[1];

      if (hashName !== '') {
        var hash = window.location.hash;
        if (hash === '') {
          alert('後退按鈕點擊');
        }
      }
    });

    // window.history.pushState('forward', null, './#forward');
  }

};


// 获取文章详情
var getArticleinfo = function (id) {
    var data = JSON.stringify({"aid": id});

    $.ajax({
        type: 'post',
        data: data,
        url: '/articleDetails',
        contentType: "application/json", // 指定数据传输格式为json，后端才能正确识别
        success: function (str) { //返回json结果
            // 成功和未登录都进行跳转
            if (str.code == 200) {
                var mdcontent = "<textarea style=\"display:none;\"\n" +
                    "name=\"test-editormd-markdown-doc\" >" + str.data[0].content + "</textarea>" +
                    "                            <script src=\"./static/editormd/examples/js/jquery.min.js\"></script>\n" +
                    "                            <script src=\"./static/editormd/lib/marked.min.js\"></script>\n" +
                    "                            <script src=\"./static/editormd/lib/prettify.min.js\"></script>\n" +
                    "                            <script src=\"./static/editormd/lib/raphael.min.js\"></script>\n" +
                    "                            <script src=\"./static/editormd/lib/underscore.min.js\"></script>\n" +
                    "                            <script src=\"./static/editormd/lib/sequence-diagram.min.js\"></script>\n" +
                    "                            <script src=\"./static/editormd/lib/flowchart.min.js\"></script>\n" +
                    "                            <script src=\"./static/editormd/lib/jquery.flowchart.min.js\"></script>\n" +
                    "                            <script src=\"./static/editormd/editormd.js\"></script>\n" +
                    "                            <script type=\"text/javascript\">\n" +
                    "                                testEditormdView2 = editormd.markdownToHTML(\"test-editormd-view\", {\n" +
                    "                                    htmlDecode: \"style,script,iframe\",  // you can filter tags decode\n" +
                    "                                    emoji: true,\n" +
                    "                                    taskList: true,\n" +
                    "                                    tex: true,  // 默认不解析\n" +
                    "                                    flowChart: true,  // 默认不解析\n" +
                    "                                    sequenceDiagram: true,  // 默认不解析\n" +
                    "                                });\n" +
                    "                            </script>\n";

                $("#test-editormd-view").append(mdcontent);
                $("#source").html("来源: " + str.data[0].source);
                $("#level").html("难度: " + str.data[0].level);
                $("#duration").html("时长: " + str.data[0].duration);
                $("#readcount").html(str.data[0].readcount);
                $("#commentcount").html(str.data[0].commentcount);
                $("#author").html("<center>作者: " + str.data[0].author + "<p>发布时间: " + str.data[0].createtime+"</p></center>");
                $("#studycount").html(str.data[0].studycount);


            } else {
                alert(str.msg);
            }
        },
        fail: function (err, status) {
            console.log(err);
        }
    });
};


