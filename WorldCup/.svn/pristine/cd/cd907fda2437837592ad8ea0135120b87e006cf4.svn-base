var setRootFontSize = {
    baseFontSize:16,
    baseScreenWidth:750,
    reset:function(){
    var actualFontSize = ($(window).width() / this.baseScreenWidth) * this.baseFontSize;
    $("body").css("zoom", 1);
    $("html").css("font-size", actualFontSize + "px");
    $("body").height($(window).height());
    $(".fullWidth").width($(window).width());

}};
$(function () {setRootFontSize.reset();});
$(window).resize(function() {setRootFontSize.reset();});