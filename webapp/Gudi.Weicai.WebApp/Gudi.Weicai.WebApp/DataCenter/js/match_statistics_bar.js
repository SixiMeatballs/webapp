var matchStatisticsBar = {
    hostValueContainerName:"hostValue",
    guestValueContainerName:"guestValue",
    hostBarName:"hostBar",
    guestBarName:"guestBar",
    drawStatisticsBar:function(targets){
        targets.forEach(function(val,index,arr){
            var hostval = parseFloat(val.children["hostValue"].getAttribute("value"));
            var guestval = parseFloat(val.children["guestValue"].getAttribute("value"));
            var minBgValue = parseFloat(val.getAttribute("minBgValue"));
            if(hostval <= minBgValue && guestval <= minBgValue){
                matchStatisticsBar.drawSingleItem(hostval,guestval,minBgValue,val);
                return;
            }
            minBgValue = hostval >= guestval? hostval: guestval;
            matchStatisticsBar.drawSingleItem(hostval,guestval,minBgValue,val);
            return;
        });
    },
    drawSingleItem:function(hostVal,guestVal,bgVal,target){
        var hostPersent = ((hostVal / bgVal) * 100) + "%";
        var guestPersent = ((guestVal / bgVal) * 100) + "%";
        target.children["hostBar"].children["barVal"].style.width = hostPersent;
        target.children["guestBar"].children["barVal"].style.width = guestPersent;
        if(hostVal > guestVal){
            target.children["guestBar"].children["barVal"].className="bg_c";
            return;
        }
        if(guestVal > hostVal){
            target.children["hostBar"].children["barVal"].className="bg_c";
            return;
        }
    },
}