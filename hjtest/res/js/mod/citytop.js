/**
* 听写最多的城市模块
* @author daqiu 2014.02
*/
;define("mod/citytop",function(require, exports, module){
    return {
        /*
        * @param [cfg] {Object} 
        * @param [cfg.data] {Array} 城市列表，length请控制在3，没有对不是3个城市的数据做测试过。。。
        * @param [cfg.data[0].name] {String} 城市区
        * @param [cfg.data[0].icon] {String} 城市ICON URL
        * @param [jEl] {Object} 模块节点对应jquery对象
        * @return 
        */
        init:function(cfg,jEl){
            if(!cfg.data || !cfg.data.length){return};
            cfg.colors = cfg.colors || ["#dd4a4a", "#48caad", "#4aa4cf"];
            jEl.html(this.render(cfg.data,cfg.colors));
        },
        // 生成html结构
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