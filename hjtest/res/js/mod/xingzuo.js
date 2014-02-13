/**
* 星座模块
* @author daqiu 2014.02
*/
;define("mod/xingzuo",function(require, exports, module){
    var xingzuo = {
        "1":"白羊",
        "2":"金牛",
        "3":"双子",
        "4":"巨蟹",
        "5":"射手",
        "6":"处女",
        "7":"狮子",
        "8":"天蝎",
        "9":"天平",
        "10":"魔蝎",
        "11":"水平",
        "12":"双鱼"
    }
    var xb = {
        "boy":"男",
        "girl":"女"
    };
    var getTipText = function(xingzuoId,sexId,val){
        return '<strong>【'+ xingzuo[xingzuoId] + xb[sexId] +'】</strong>我挑故我在，敢爱敢恨，在'+ xb[sexId] +'生中挑错名列第一，人均<em>'+ val +'</em>次';
    }
    return {
        /*
        * @param [cfg] {Object} 
        * @param [cfg.data] {Object} 
        * @param [cfg.data.boy] {Object} 男生数据，必须，k:星座id，v：消费量，k值与本模块内置的xingzuo要保持一至
        * @param [cfg.data.girl] {Object} 女生数据，必须，k:星座id，v：消费量
        * @param [jEl] {Object} 模块节点对应jquery对象
        * @return 
        */
        init:function(cfg,jEl){
            var self = this;
            if(!cfg.data || !cfg.data.boy || !cfg.data.girl){
                return jEl.hide();
            };
            $.each(cfg.data,function(k,v){
                self.resetDate(v,280);
                var sekModDom = jEl.find(".cjd_xz_"+k);
                sekModDom.html(self.render(k,v)).find('li').hover(function(){
                    $(this).addClass("hover");
                    var xingzuoId = $(this).attr("data-xingzuoId");
                    sekModDom.find(".cjd_xz_tip").html(getTipText(xingzuoId,k,v[xingzuoId]['val']));
                },function(){
                    $(this).removeClass("hover");
                });
            });
        },
        // 生成html结构
        // jQuery template 不熟 就先硬编码了
        render:function(sexkey,data){
            /*<p class="tit"><em>星座女</em>全年人均消费</p>
                   <ul class="cjd_xz_list clearbox">
                       <li class="i1"><b></b><s></s><em>白羊</em></li>
                       <li class="i2"><b></b><s></s><em>金牛</em></li>
                       <li class="i3"><b></b><s></s><em>双子</em></li>
                       <li class="i4"><b></b><s></s><em>巨蟹</em></li>
                       <li class="i5"><b></b><s></s><em>射手</em></li>
                       <li class="i6"><b></b><s></s><em>处女</em></li>
                       <li class="i7"><b></b><s></s><em>狮子</em></li>
                       <li class="i8"><b></b><s></s><em>天蝎</em></li>
                       <li class="i9"><b></b><s></s><em>天平</em></li>
                       <li class="i10"><b></b><s></s><em>魔蝎</em></li>
                       <li class="i11"><b></b><s></s><em>水平</em></li>
                       <li class="i12"><b></b><s></s><em>双鱼</em></li>
                   </ul>
                   */
            var html = [
                '<p class="tit"><em>星座'+ xb[sexkey]  +'</em>全年人均消费</p>',
                '<ul class="cjd_xz_list clearbox">'
            ];
            var topKey;
            $.each(data,function(k,v){
                if(v.isMax){topKey = k;}
                html.push('<li data-xingzuoId="'+k+'" class="i'+k + (v.isMax?" top":"") +'" title="'+ xingzuo[k] + xb[sexkey] + "人均" + v.val +'"><b style="'+v.sty+'"></b><s></s><em>'+ xingzuo[k]+'</em></li>');
            });
           
            html.push('</ul>');
            html.push('<p class="cjd_xz_tip">'+getTipText(topKey,sexkey,data[topKey]['val'])+'</p>');
            return html.join("");
        },
        // 计算对应高度
        resetDate:function(data, elHeight){
            var max, min, maxkey, minkey;
            var maxHeight = elHeight-100,//最大数占满容器
                minHeight = 16; //最小数的高度基数

            // 计算最大最小
            $.each(data,function(key,item){
                if(max === undefined){
                    max = item.val;
                    min = item.val;
                    maxkey = key;
                    minkey = key;
                }else{
                    if(item.val>max){
                        max = item.val;
                        maxkey = key;
                    }else if(item.val<min){
                        min = item.val;
                        minkey = key;
                    }
                }
            });
            data[maxkey]['isMax'] = true;
            data[minkey]['isMin'] = true;

            // 得出样式结果
            $.each(data,function(key,item){
                var bheight = 0;
                if(item.isMax){
                    bheight=0;
                }else if(item.isMin){
                    bheight = maxHeight;
                }else{
                    // 这个算法不精确 示意大小够用
                    bheight = maxHeight - Math.floor((item.val - min)/(max-min) * maxHeight);
                }
                item["sty"] = "height:"+ (bheight + 16)+"px;";
            });
        }
    }
});