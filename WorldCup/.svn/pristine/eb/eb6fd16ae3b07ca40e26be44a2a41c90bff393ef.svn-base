
var draggableFixer ={
    init:function(){
        document.addEventListener("touchstart", this.touchHandler, true);
        document.addEventListener("touchmove", this.touchHandler, true);
        document.addEventListener("touchend", this.touchHandler, true);
        document.addEventListener("touchcancel", this.touchHandler, true);
    },
    touchHandler:function(event){
        var touches = event.changedTouches;
        var first = touches[0];
        var type = "";

        switch(event.type)
        {
            case "touchstart": type = "mousedown"; break;
            case "touchmove":  type="mousemove"; break;
            case "touchend":   type="mouseup"; break;
            default: return;
        }

        var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent(type, true, true, window, 1,
            first.screenX, first.screenY,
            first.clientX, first.clientY, false,
            false, false, false, 0/*left*/, null);

        first.target.dispatchEvent(simulatedEvent);
        event.preventDefault();
    }
};
draggableFixer.init();