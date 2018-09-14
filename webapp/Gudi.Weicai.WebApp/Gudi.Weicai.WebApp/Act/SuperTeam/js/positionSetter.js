var positionSetter = {
    orgWidth:750,
    setX:function(target,x){
        var scale =  $(window).width()/this.orgWidth;
        target.offset({left:x * scale});
    },
    setPositionSize : function(target, x, y, width, height){
        var scale =  $(window).width()/this.orgWidth;
        target.width(width * scale);
        target.height(height * scale);
        target.offset({top:y * scale,left:x * scale});
    },
    setSize : function(target,width, height){
        var scale =  $(window).width()/this.orgWidth;
        target.width(width * scale);
        target.height(height * scale);
    },
    setPositionSizeFromBottom : function(target, x, bottomDistance, minY, width, height){
        var scale =  $(window).width()/this.orgWidth;
        target.width(width * scale);
        target.height(height * scale);
        var screenHeight = $(window).height();
        var y = screenHeight - bottomDistance * scale;
        minY = minY * scale;
        y = y > minY? y : minY;
        target.offset({top:y,left:x * scale});
    },
    setPosition : function(target, x, y){
        var scale =  $(window).width()/this.orgWidth;
        target.offset({top:y * scale,left:x * scale});
    },
    setFontSize:function(target, size){
        var scale =  $(window).width()/this.orgWidth;
        target.css("font-size",size * scale);
    }
}