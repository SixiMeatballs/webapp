function change(navigationItems,className,num){	
	if(navigationItems==null) return ;
    if (className == null) className = 'active';
    if (num == null) num = 1;
	var deviceReader = {
		screenAspect : [
			{width:375,height:812,device:"iPhoneX"}
			// ,{width:360,height:640,device:"hammerOD105"}  //锤子
		],
		isSameScreenAspectRatio:function(deviceWidth,deviceHeight,targetWidth,targetHeight){
			return (deviceHeight / deviceWidth) * targetWidth == targetHeight;
		},
		getDevice:function(){
			var width = window.screen.width;
			var height = window.screen.height;
			for(var i = 0; i < this.screenAspect.length; i++){
				if(this.isSameScreenAspectRatio(width,height,this.screenAspect[i].width,this.screenAspect[i].height))
					return this.screenAspect[i].device;
			}
			return "unknown";
		},
		isFromWeixin:function(){
		    var ua = navigator.userAgent.toLowerCase();  
		    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
		        return true;  
		    } else {  
		        return false;  
		    }  
		},
    };
    if (deviceReader.getDevice() == "iPhoneX" && deviceReader.isFromWeixin() && num==1) {
		navigationItems.classList.add(className);
    };
    if (deviceReader.getDevice() == "iPhoneX"&&num==2) {
        navigationItems.classList.add(className);
    };
}

