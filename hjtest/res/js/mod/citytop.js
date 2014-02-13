/**
* 听写节目图表模块
* @author daqiu 2014.02
*/
;define("mod/citytop",function(require, exports, module){
    return {
        /*
        * @param [cfg] {Object} 
        * @param [cfg.data] {Array} 节目国家列表
        * @param [cfg.data[0].name] {String} 城市区
        * @param [cfg.data[0].icon] {String} 城市ICON URL
        * @param [jEl] {Object} 模块节点对应jquery对象
        * @return 
        * color由谁设 视情况
        */
        init:function(cfg,jEl){
            if(!cfg.data || !cfg.data.length){return};
            cfg.colors = cfg.colors || ["#dd4a4a", "#48caad", "#4aa4cf"];
            jEl.html(this.render(cfg.data,cfg.colors));
        },
        // 生成html结构
        // jQuery template 不熟 就先硬编码了
        render:function(data,colors){
            var html = [];
            html.push("<ul class='cjd_fz_m3list clearbox'>");
            $.each(data,function(index,item){
                html.push('<li class="item'+ index +'" style="background-image:url('+ item['icon'] +');"><em style="background-color:'+colors[index]+'">'+item['name']+'</em></li>');
            });
            html.push('</ul>');
            return html.join("");
        }
    }
});