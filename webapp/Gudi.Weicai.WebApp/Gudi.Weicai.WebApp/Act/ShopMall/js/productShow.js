$(function () {
    var storage = window.localStorage;
    var phone = phone;
    new Vue({
        el: '#productShow',
        data: {
            goodsId: null,
            product: null,
            couponList: null,
            giftAlertShow: false,
            getGiftAlert: false,
            phoneNum: null,
            commonAlertShow: false,
            commonAlert: null,
            successAlertShow: false,
            successAlertShowed: false,
            countDownStart: null,
            countDownEnd: null,
            StartNum: null,
            EndNum: null,
        },
        created() {
            document.body.removeChild(document.getElementById('Loading'));
        },
        methods: {
            getProduct: function (goodsId) {
                var _self = this;
                var d = { goodsId: goodsId}
                callapi('/mall/GetGoodsDetails', d, '', function (data) {
                    _self.product = data.Data;
                    _self.ShowCountDown();
                })
            },
            getCouponList: function () {
                var _self = this;
                _self.giftAlertShow = true;

                var d = { promotionType: 1 }
                callapi('Promotion/GetPromotionCoupon', d, '', function (data) {
                    _self.couponList = data.Data[0];
                });
            },
            ShowCountDown: function () {
                var _self = this;
                var timer;
                timer = setInterval(function () {
                    if (_self.product.StartBuyCountDownSecond > 0) {
                        _self.StartNum = ShowCountDown(_self.product.StartBuyCountDownSecond);
                        _self.product.StartBuyCountDownSecond--;
                    } else {
                        _self.StartNum = ShowCountDown(0);
                    };
                    if (_self.product.EndBuyCountDownSecond > 0) {
                        _self.EndNum = ShowCountDown(_self.product.EndBuyCountDownSecond);
                        _self.product.EndBuyCountDownSecond--;
                    } else {
                        _self.EndNum = ShowCountDown(0);
                    };
                }, 1000);
            },
            handleClose: function () {
                var _self = this;
                _self.giftAlertShow = false ;
                _self.getGiftAlert = false;
                _self.successAlertShow = false;
                _self.successAlertShowed = false;
            },
            showReceiveAlert: function () {
                var _self = this;
                _self.getGiftAlert = true;
            },
            receiveGift: function () {
                var _self = this;
                var phoneNum = _self.phoneNum;
                var refId = _self.couponList.RefId; 
                var d = { refId: refId, phone: phoneNum };
                callapi('/Promotion/ReceiveCoupon', d, '', function (data) {
                    _self.successAlertShow = true;
                   
                }, function (data) {
                    if (data.ErrorCode == 4001 && data.State == 'failed' && data.Message !='手机号不能为空') {
                        _self.commonAlert = data.Message;
                        _self.commonAlertShow = true;
                        setTimeout(function () {
                            _self.commonAlertShow = false;
                            _self.giftAlertShow = false;
                            _self.getGiftAlert = false;

                        }, 1500);
                    }
                })
            }

        },
        compiled: function () {
            var _self = this;
            var goodsId = getUrlParam('id');
            _self.getProduct(goodsId);
            InitOpenApp(
                {
                    ActionType: 'Activity',
                    ActionValue: 'INDEX',
                    Parameters: null
                }
            );
            
        }
    })
});
