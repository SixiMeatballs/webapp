$(document).ready(function () {
    var pageTimer = {};
    new Vue({
        el: '#page_selectround',
        data: {
            roundlist: null,
            matchstagelist: null,
            activatedround: null,
            CountDown: null,
            mySwiper: null,
            tasklist: null,
            activeIndex: -1,
            currentroundid:0
        },
        methods: {
            getRoundList: function () {
                var _self = this;
                callapi("WorldCup/GetGuessRound", "", "", function (data) {
                    _self.roundlist = data.Data;

                    var _roundid = GetlocalStorageItem(constWord.ActivedGuessRoundId, 0);
                    var selectindex = -1;
                    if (_roundid != 0) {
                        selectindex = findElem(_self.roundlist, "Id", _roundid);
                    }

                    if (selectindex == -1) {
                        selectindex = findElem(_self.roundlist, "DefaultActived", true);
                    }
                    
                    
                    if (selectindex < 0) selectindex = 0;
                    _self.activeIndex = selectindex;
                    if (_self.roundlist.length > 0) {
                        _self.currentroundid = _self.roundlist[selectindex].Id;
                    }


                    _self.$nextTick(function () {
                        mySwiper = new Swiper('.swiper-container', {
                            slidesPerView: 3,
                            centeredSlides: true,
                            slideActiveClass: 'activated',
                            on: {
                                slideChange: function () {
                                    _self.activeIndex = this.activeIndex;
                                    _self.changeActivedRound();
                                },
                            },
                        });

                        mySwiper.slideTo(selectindex, 1000, false);
                    });
                    //如果是第一项，得手动调用一下
                    if (_self.activeIndex == 0) {
                        _self.changeActivedRound();
                    }
                    
                });
            },
            handleback: function () {
                var _self = this;
                $(".info_alert").css("display", "none");
                if (_self.currentroundid == 0) return;
                _self.changeActivedRound();
            },
            clickSwiper: function (index) {
                var _self = this;
                if (_self.activeIndex == index) {
                    return;
                }
                _self.activeIndex = index;
                mySwiper.slideTo(index, 1000, false);
            },
            getMatchStageList: function () {
                var _self = this;
                callapi("WorldCup/GetMatchStage", "", "", function (data) {
                    _self.matchstagelist = data.Data;
                });
            },
            ShowCountDown: function () {
                var _self = this;
                for (var each in pageTimer) {
                    clearInterval(pageTimer[each]);
                }
                var name = "timeraa" + _self.activatedround.Id;
                pageTimer[name] = setInterval(function () {
                    _self.CountDown = ShowCountDown(_self.activatedround.SelingTotalSeconds);
                    _self.activatedround.SelingTotalSeconds--;
                    if (_self.activatedround.SelingTotalSeconds <= 0) {
                        clearInterval(pageTimer[name]);
                        _self.changeActivedRound();
                    }
                }, 1000);
            },
            gotoselectgame: function (roundid) {
                gotourl("slecet_game.html?roundid=" + roundid);
            },
            getTaskList: function () {
                var _self = this;
                var d = { roundId: _self.activatedround.Id };
                if (_self.activatedround.RoundStatus != 1 || _self.activatedround.MineRoundStatus != 0) {
                    return;
                }
                callapi("WorldCup/GetGuessRoundJoinWay", d, "", function (data) {
                    _self.tasklist = data.Data;
                });
            },
            boxbuycard: function () {
                messagebox("boxbuycard");
            },
            buycardconfirm: function () {
                var _self = this;
                $("#boxbuycard").css("display","none");
                messagebox("boxbuyrightcardconfirm", function () {
                    _self.buycard();
                });
            },
            buycard: function () {
                var _self = this;
                var d = { roundId: _self.activatedround.Id };
                if (_self.activatedround.RoundStatus != 1 || _self.activatedround.MineRoundStatus != 0) {
                    return;
                }
                callapi("WorldCup/BuyRightCard", d, "", function (data) {
                    _self.changeActivedRound();
                });
            },
            boxbuyscorecard: function () {
                var _self = this;
                messagebox("boxbuyscorecardconfirm", function () {
                    _self.buyscorecard();
                });
            },
            buyscorecard: function () {
                var _self = this;
                var d = { roundId: _self.activatedround.Id };
                if (_self.activatedround.RoundStatus != 2) {
                    return;
                }
                callapi("WorldCup/BuyScoreCard", d, "", function (data) {
                    gotourl("select_round.html");
                });
            },
            changeActivedRound: function () {
                var _self = this;

                //console.log("aaaa:"+_self.activeIndex);
                var activeRoundId = findElemAttr(_self.roundlist, _self.activeIndex, "Id", 0);
                if (activeRoundId == 0) return;
                localStorage.setItem(constWord.ActivedGuessRoundId, activeRoundId);
                var d = { roundId: activeRoundId };
                callapi("WorldCup/GetGuessOneRound", d, "", function (data) {
                    _self.activatedround = data.Data;

                    if (_self.activatedround.SelingTotalSeconds > 0) {
                        _self.ShowCountDown();
                    }
                    
                    _self.getTaskList();
                });
                
            },
            joinway: function (item) {
                NativeJump(item.AppAction);
            }
        },
        compiled: function () {
            this.getRoundList();
            this.getMatchStageList();
           
        }
    })
});

