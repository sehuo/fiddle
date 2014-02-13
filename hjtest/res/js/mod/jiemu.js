/**
* 听写节目图表模块
* @author daqiu 2014.02
*/
;define("mod/jiemu",function(require, exports, module){
    return {
        /*
        * @param [cfg] {Object} 
        * @param [cfg.data] {Array} 节目国家列表
        * @param [cfg.data[0].num] {Number} 节目数
        * @param [cfg.data[0].icon] {String} 国旗图片URL
        * @param [jEl] {Object} 模块节点对应jquery对象
        * @return 
        */
        init:function(cfg,jEl){
            if(!cfg.data || !cfg.data.length){return};
            var elHeight = jEl.height() - 8, elWith = jEl.width();//高度上预留30px不占用
            this.resetDate(cfg.data,elWith,elHeight);
            jEl.html(this.render(cfg.data));
        },
        // 生成html结构
        // jQuery template 不熟 就先硬编码了
        render:function(data){
            var html = [];
            html.push("<ul>");
            $.each(data,function(index,item){
                html.push('<li style="'+ item['sty'] +'" title="'+ item['num'] +'"><img src="'+ item['icon'] +'" alt=""></li>');
            });
            html.push('</ul>');
            return html.join("");
        },
        // 计算对应高度
        resetDate:function(data, elWith, elHeight){
            var max , min;
            var len = data.length;
            var liWidth = 7;
            var maxHeight = elHeight,//最大数占满容器
                minHeight = 100; //最小数的高度基数，高度总不能为0 单位px

            // 计算左右边距
            var itemMargin = Math.floor((elWith - len * liWidth)/len);
            var margLeft = margRight = Math.floor(itemMargin/2);
            if(itemMargin%2 == 1){margRight++;}
            // 计算最大最小
            $.each(data,function(index,item){
                if(max === undefined){
                    max = item["num"];
                    min = item["num"];
                }else{
                    max = Math.max(max,item["num"]);
                    min = Math.min(min,item["num"]);
                }
            });
            // 得出样式结果
            $.each(data,function(index,item){
                if(max == item["num"]){
                    item["sty"] = "height:"+maxHeight+"px;margin-top:"+0+"px;";
                }else if(min == item["num"]){
                    item["sty"] = "height:"+minHeight+"px;margin-top:"+(elHeight - minHeight)+"px;";
                }else{
                    // 这个算法不精确 示意大小够用
                    var h = Math.floor((item["num"] - min)/(max-min) * (maxHeight - minHeight)) + minHeight;
                    item["sty"] = "height:"+h+"px;margin-top:"+(elHeight - h)+"px;";
                }
                item["sty"] += "margin-left:"+margLeft+"px;margin-right:"+margRight+"px"
            });
            
        }
    }
});