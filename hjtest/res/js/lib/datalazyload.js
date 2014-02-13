;define("lib/datalazyload",function(require, exports, module){
    return (function($,win) {
        $.fn.datalazyload = function(callback,options) {
            var cache = [],
                timer,
                config = $.extend({
                    diff:{
                        top:0,
                        bottom:200
                    }
                }, options || {});
            var destroy = function(){
                $(window).unbind("scroll", refresh);
            }
            var refresh = function(){
                if(timer){
                    clearTimeout(timer)
                }
                timer = setTimeout(function(){
                    check();
                },35);
            }

            $(this).each(function() {
                cache.push($(this));
            });
            
            //动态显示数据
            var check = function() {
                var viewTop = $(win).scrollTop() - config.diff.top, viewBottom = viewTop + $(win).height() + config.diff.bottom;
                //console.log(viewTop,viewBottom);
                // 销毁
                if(cache.length==0){
                    return destroy();
                }
                for(var i =0,ii=cache.length;i<ii;i++){
                    var el = cache[i]
                        elTop = el.offset().top, //上边距
                        elBottom = elTop + el.height();
                    // 容器的上下边不同时比视区上边小 且 不同时比视区下边大
                    if( !(elTop > viewBottom && elBottom > viewBottom) && !(elTop < viewTop && elBottom < viewTop)){
                        callback.call(el);
                        cache.splice(i,1);
                        ii--;
                        i--;
                    }
                };
            };
            check();
            $(win).bind("scroll", refresh);
        };
    })(jQuery,window);
});