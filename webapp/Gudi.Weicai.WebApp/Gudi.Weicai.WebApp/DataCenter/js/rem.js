var remAdjuster = {
    designWidth : 750, // 基础设计宽度
    adjust:function(){
        var clientWidth = document.documentElement.clientWidth;
        document.documentElement.style.fontSize = (clientWidth/this.designWidth*100)+"px";
    }

}
window.onload=function(){
    remAdjuster.adjust();
    window.onresize = remAdjuster.adjust();   // 检测屏幕变化
    
changeimg();
}
