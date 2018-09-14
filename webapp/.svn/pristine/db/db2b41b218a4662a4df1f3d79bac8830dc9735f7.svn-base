$(function () {
    new Vue({
        el: '#page_record',
        data: {
            roundlist: null,//轮次列表
            rounddetails: null,//轮次详情
            currentroundid: null,//当前轮次id
            matchlist: null//比赛列表
        },
        methods: {
            //获取轮次列表
            getRoundList: function () {
                var _self = this;
                callapi("WorldCup/GetMyGuessRound", "", "", function (data) {
                    _self.roundlist = data.Data;
                    if (data.Data.length > 0) {
                        _self.currentroundid = _self.roundlist[0].Id;
                        _self.$nextTick(function () {
                            mySwiper = new Swiper('.swiper-container', {
                                slidesPerView: 3,
                                centeredSlides: true,
                                slideActiveClass: 'activated',
                                on: {
                                    slideChange: function () {
                                        var currentIndex = this.activeIndex;
                                        _self.currentroundid = _self.roundlist[currentIndex].Id;
                                        _self.getRoundDetails(_self.currentroundid);
                                    },
                                },
                            });
                            mySwiper.slideTo(0, 1000, false);
                        });
                    }
                });
            },
            clickSwiper: function (index) {
                var _self = this;
                var roundid = _self.roundlist[index].Id;
                if (_self.currentroundid == roundid) {
                    return;
                }
                _self.currentroundid = roundid;
                //_self.getRoundDetails(_self.currentroundid);
                mySwiper.slideTo(index, 1000, false);
            },
            //获取指定轮次详情和场次列表
            getRoundDetails: function (roundId) {
                var _self = this;
                if (roundId > 0) {
                    _self.currentroundid = roundId;
                    callapi("WorldCup/GetGuessOneRound", { roundId: roundId }, "", function (data) {
                        _self.rounddetails = data.Data;
                    });
                    callapi("WorldCup/GetGuessMatchRecord", { roundId: roundId }, "", function (data) {
                        _self.matchlist = data.Data;
                    });
                }
            }
        },
        compiled: function () {
            this.getRoundList();
            this.getRoundDetails(this.currentroundid);
        }
    })
});