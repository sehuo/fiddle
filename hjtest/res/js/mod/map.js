/**
* 地区模块
* @author daqiu 2014.02
* @desc  fork https://github.com/rockyuse/svgmap，修正与seajs的冲突，其他方便参考他的官方说明
*/
;define("mod/map",["lib/raphael-min.js",'lib/chinaMapConfig','lib/map'],function(require, exports, module){
    var leveMap = {
        "0":[],
        "1":[],
        "2":[]
    }
    return {
        /*
        * @param [cfg] {Object} 
        * @param [cfg.dq] {Object} 地区对象，key为地区拼音id，地区拼音id见chinaMapConfig.js列表
        * {"jiangsu":{"data":0.34}}，注意cfg.dq[key]['data']类型为Number，模块中未作兼容牏。。
        * @param [jEl] {Object} 模块节点对应jquery对象
        */
        init:function(cfg,jEl){
            var cfg = this.resetData(cfg);
            var mapExt = {};
            $("#map").SVGMap({
                external:mapExt,
                mapWidth: 400,
                mapHeight: 340,
                //showTip: false,
                stateData:cfg.dq||{},
                stateTipHtml: function(stateData, obj){
                    return obj.name +': ' + (stateData[obj.id] && stateData[obj.id]['data'] || "--");
                }
            });
            this.hover(mapExt,jEl);
            
        },
        // 由数值计算出颜色
        resetData:function(cfg){
            var cfg = cfg||{};
            if(cfg.dq){
                $.each(cfg.dq,function(k,v){
                    if(v['data']>0.7){
                        v['stateInitColor'] = 0;
                        leveMap[0].push(k);
                    }else if(v['data']>0.5){
                        v['stateInitColor'] = 1;
                        leveMap[1].push(k);
                    }else{
                        leveMap[2].push(k);
                    }
                });
            }
            return cfg;
        },
        hover:function(mapExt,jEl){
            // 右侧的 
            var valAreaName =  valHfillColor = "";
            var hoverColor = "#E99A4D";
            jEl.find(".cjd_dq_m3 li").hover(function(){
                if($.browser.msie && $.browser.version < 7){
                    $(this).addClass("hover");
                }
                valAreaName = $(this).attr('data-area');
                valHfillColor = mapExt[valAreaName].attr('fill');
                mapExt[valAreaName].attr({
                    fill: hoverColor
                });
            },function(){
                if($.browser.msie && $.browser.version < 7){
                    $(this).removeClass("hover");
                }
                mapExt[valAreaName].attr({
                    fill: valHfillColor
                });
            });

            // 下方的
            var curLeveArea;
            jEl.find(".cjd_maptip dd").hover(function(){
                var leve = $(this).attr("data-leve");
                curLeveArea = leveMap[leve];
                if(!curLeveArea.length) return;

                valHfillColor = mapExt[curLeveArea[0]].attr('fill');
                $.each(curLeveArea,function(index,areaName){
                    mapExt[areaName].attr({
                        fill: hoverColor
                    });
                });
            },function(){
                $.each(curLeveArea,function(index,areaName){
                    mapExt[areaName].attr({
                        fill: valHfillColor
                    });
                });
            });
        }
    }
});