window.cjd = function($,win){
    return {
        config:{
            timestamp:20140212
        },
        _requiresMap:{},
        _mods:{},
        load:function(modName,callback){
            var self = this;
            if(this._mods[modName]){
                callback.call(self,self._mods[modName].fn);
                return;
            }
            // 时间戳从长计议。。
            // 没用 $.getScript因为想使用cache
            $.ajax({
                url: "res/js/"+modName+".js?t="+self.config.timestamp,
                dataType: 'script',
                cache:true,
                success: function(){
                    var curMod = self._mods[modName];
                    self._recallback(modName);
                    //if(curMod.requires && curMod.requires.length){
                    //}else{
                        callback.call(self,curMod.fn);
                    //}
                    
                }
            });
        },
        add:function(modName,callback,requires){
            var self = this;
            if(requires && requires.length){
                $.each(requires,function(index,req){
                    self._requiresMap[req] = self._requiresMap[req] || [];
                    self._requiresMap[req].push(modName);
                });
            }
            self._mods[modName] = {
                fn:callback.call(self,win.cjd),
                requires:requires
            };
        },
        // 判断依赖回调
        _recallback:function(modName){
            //存在被依赖
            if(this._requiresMap[modName]){
                //$.each()
            }
        }
    }
}(jQuery,window);
