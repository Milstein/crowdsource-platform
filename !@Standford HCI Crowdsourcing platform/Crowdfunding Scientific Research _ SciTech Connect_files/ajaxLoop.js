// ajaxLoop.js
jQuery(function($){
    var page = 2;
    var loading = true;
    var $window = $(window);
    var $content = $(".postArea .posts");
    var load_posts = function(page, cat){

            $.ajax({
                type       : "GET",
                data       : {numPosts : 8, pageNumber: parseInt(page), cat: cat},
                dataType   : "html",
                url        : "/wp-content/themes/scitechconnect/loopHandler.php",
                beforeSend : function(){
                    if(page != 1){
                        $content.append('<div id="temp_load" style="text-align:center">\
                            <img src="/wp-content/themes/scitechconnect/images/ajax-loader.gif" />\
                            </div>');
                    }
                },
                success    : function(data){
                    $('.morePosts a').attr('href','page/'+(parseInt(page)+1))
                    $data = $(data);
                    if($data.length){
                        $data.hide();
                        $content.append($data);
                        $data.fadeIn(500, function(){
                            $("#temp_load").remove();
                            loading = false;
                        });
                    } else {
                        $("#temp_load").remove();
                    }
                    $('.leftposts .post, .rightposts .post').click(function() {
                        var href = $(this).children('a').attr('href');
                        window.location.href = href;
                    });
                    page++;
                },
                error     : function(jqXHR, textStatus, errorThrown) {
                    $("#temp_load").remove();
                    alert(jqXHR + " :: " + textStatus + " :: " + errorThrown);
                }
        
        });
    }
    $window.scroll(function() {
        /*var content_offset = $content.offset();
        console.log(content_offset.top);
        if(!loading && ($window.scrollTop() +
            $window.height()) > ($content.scrollTop() +
            $content.height() + content_offset.top)) {
                loading = true;
                page++;
                load_posts();
        }*/
    });
    
    $('.morePosts a').click(function(e){
        e.preventDefault();
        var pattern1 = /\d+/;
        var cattegory = $(this).attr('id').match(pattern1);
        var page = $(this).attr('href').match(pattern1);

        load_posts(page, cattegory);

    })
    
});