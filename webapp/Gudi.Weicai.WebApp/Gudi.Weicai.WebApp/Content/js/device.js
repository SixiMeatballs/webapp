//判断设备
function judge() {
    var deviceReader = {
        screenAspect: [
            { width: 375, height: 812, device: "iPhoneX" }

        ],
        isSameScreenAspectRatio: function (deviceWidth, deviceHeight, targetWidth, targetHeight) {
            return (deviceHeight / deviceWidth) * targetWidth == targetHeight;
        },
        getDevice: function () {
            var width = window.screen.width;
            var height = window.screen.height;
            for (var i = 0; i < this.screenAspect.length; i++) {
                if (this.isSameScreenAspectRatio(width, height, this.screenAspect[i].width, this.screenAspect[i].height))
                    return this.screenAspect[i].device;
            }
            return "unknown";
        },
        isFromWeixin: function () {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            } else {
                return false;
            }
        }
    };
    if (deviceReader.getDevice() == "iPhoneX" && deviceReader.isFromWeixin()) {
        document.getElementById("footer").classList.add("iphonex_bottom");
    }

}

