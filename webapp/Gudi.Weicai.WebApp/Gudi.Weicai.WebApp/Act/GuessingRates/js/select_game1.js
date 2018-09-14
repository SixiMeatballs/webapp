$(document).ready(function () {
    new Vue({
        el: '#page_selectmatch',
        data: {
            roundId: 0,
            activatedround: null,
            mySwiper: null,
            activeIndex: -1,
            matchlist: null,
            selectmatchlist: [],
            grouplist: null,
            TotalCount:0
        },
        methods: {
            init: function () {
                var _self = this;
                _self.roundId = getUrlParam("roundid");
            },
            getActivedRound: function () {
                var _self = this;
                var d = { roundId: _self.roundId };
                callapi("WorldCup/GetGuessOneRound", d, "", function (data) {
                    _self.activatedround = data.Data;
                    _self.grouplist = coppyArray(_self.activatedround.Group);                    

                    _self.$nextTick(function () {
                        if (_self.grouplist != undefined && _self.grouplist.length > 0) {
                            _self.activeIndex = 0;
                            mySwiper = new Swiper('.swiper-container', {
                                slidesPerView: 4,
                                centeredSlides: true,
                                slideActiveClass: 'activated',
                                observer: true,//修改swiper自己或子元素时，自动初始化swiper 
                                //observeParents: false,//修改swiper的父元素时，自动初始化swiper 
                                on: {
                                    slideChange: function () {
                                        //console.log(this.activeIndex);
                                        _self.activeIndex = this.activeIndex;
                                        _self.getmatchlist();
                                    },
                                }
                            });

                            mySwiper.slideTo(0, 1000, false);
                        }

                        _self.getmatchlist();

                    });
                });
            },
            clickSwiper: function (index) {
                var _self = this;
                if (_self.activeIndex == index) {
                    return;
                }
                _self.activeIndex = index;
                mySwiper.slideTo(index, 1000, false);
            },
            getmatchlist: function () {
                var _self = this;
                var Group = "";
                if (_self.grouplist != undefined && _self.grouplist.length > 0) {
                    var Group = findElemAttr(_self.grouplist, _self.activeIndex, "GroupName", "");
                }
                var d = { roundId: _self.roundId, Group: Group };
                callapi("WorldCup/GetGuessMatch", d, "", function (data) {
                    _self.matchlist = data.Data;
                    _self.cal(1);
                });
            },
            selectmatch(item, wintype) {
                var _self = this;
                //已经提交的比赛
                if (item.Selected) {
                    return;
                }
                
                //新选的
                var selectindex = findElem(_self.selectmatchlist, "MatchId", item.MatchId);
                if (selectindex == -1) {
                    if (_self.TotalCount >= _self.activatedround.MatchCount) {
                        return;
                    }
                    var d = {};
                    d.GroupName = item.GroupName;
                    d.MatchId = item.MatchId;
                    d.WinType = wintype;
                    d.HomeSimplifiedName = item.HomeSimplifiedName;
                    d.GuestSimplifiedName = item.GuestSimplifiedName;
                    d.SelectTeam = "平";
                    d.SelectTeamScore = item.DogfallScore;
                    if (wintype == 1) {
                        d.SelectTeam = item.HomeSimplifiedName+ "胜";
                        d.SelectTeamScore = item.HomeWinScore;
                    }
                    else if (wintype == 3) {
                        d.SelectTeam = item.GuestSimplifiedName + "胜";
                        d.SelectTeamScore = item.GuestWinScore;
                    }
                    _self.selectmatchlist.push(d);
                    _self.cal(0);
                    return;
                }
                var m = _self.selectmatchlist[selectindex];
                //点击两次 同一个选项，相当于取消
                if (m.WinType == wintype) {
                    _self.selectmatchlist.splice(selectindex, 1);
                    _self.cal(0);
                    return;
                }
                //更改选项
                _self.selectmatchlist[selectindex].WinType = wintype;

                _self.selectmatchlist[selectindex].HomeSimplifiedName = item.HomeSimplifiedName;
                _self.selectmatchlist[selectindex].GuestSimplifiedName = item.GuestSimplifiedName;
                _self.selectmatchlist[selectindex].SelectTeam = "平";
                _self.selectmatchlist[selectindex].SelectTeamScore = item.DogfallScore;
                if (wintype == 1) {
                    _self.selectmatchlist[selectindex].SelectTeam = item.HomeSimplifiedName + "胜";
                    _self.selectmatchlist[selectindex].SelectTeamScore = item.HomeWinScore;
                }
                else if (wintype == 3) {
                    _self.selectmatchlist[selectindex].SelectTeam = item.GuestSimplifiedName + "胜";
                    _self.selectmatchlist[selectindex].SelectTeamScore = item.GuestWinScore;
                }
                _self.cal(0);
            },
            RestMatch: function () {
                var _self = this;
                _self.selectmatchlist = [];
                _self.cal(0);
            },
            SubmitMatchConfirm: function () {
                var _self = this;

                var matchlist = [];
                var count = _self.selectmatchlist.length;
                if (count == 0) {
                    MessageAlert("请选择比赛再提交");
                    return;
                }
                messagebox("boxmatchinfo", function () {
                    _self.SubmitMatch();
                })
            },
            SubmitMatch: function () {
                var _self = this;

                var matchlist = [];
                var count = _self.selectmatchlist.length;
                if (count == 0) {
                    MessageAlert("请选择比赛再提交");
                    return;
                }
                for (j = 0; j < count; j++) {
                    var m = _self.selectmatchlist[j];
                    var m1 = {};
                    m1.MatchId = m.MatchId;
                    m1.WinType = m.WinType;
                    matchlist.push(m1);
                }
                

                //string teamName, long roundId, string playerInfo
                var d = {
                    roundId: _self.roundId,
                    MatchList: matchlist
                };

                var url = "WorldCup/SubmitGuessMatch";

                callapi(url, d, "", function (data) {
                    MessageOk("提交比赛成功", function () {
                        gotourl("select_round.html");
                    });
                }, function (data) {
                    MessageAlertNoButton(data.Message, 2);
                    })
            },
            cal: function (v) {
                var _self = this;
                
                //计算分组的数量
                if (v != undefined && v == 0) {
                    _self.grouplist = coppyArray(_self.activatedround.Group);
                    if (_self.grouplist != undefined && _self.grouplist.length > 0) {
                        var groupcount = _self.grouplist.length;
                        for (j = 0; j < groupcount; j++) {
                            _self.grouplist[j].Count += findElemNum(_self.selectmatchlist, "GroupName", _self.grouplist[j].GroupName);
                        }
                    }
                }
               
                //选择的数量
                _self.TotalCount = _self.activatedround.TotalCount;// + _self.selectmatchlist.length;
                if (_self.selectmatchlist != undefined) {
                    _self.TotalCount += _self.selectmatchlist.length;
                }


                var matchcount = _self.matchlist.length;
                for (j = 0; j < matchcount; j++) {
                    var matchindex = findElem(_self.selectmatchlist, "MatchId", _self.matchlist[j].MatchId);
                    if (matchindex == -1) {
                        _self.matchlist[j].WinType1 = 0;
                        continue;
                    }
                    _self.matchlist[j].WinType1 = _self.selectmatchlist[matchindex].WinType;
                }

               
            }
        },
        compiled: function () {
            this.init();
            this.getActivedRound();
        }
    })
});

