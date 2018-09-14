//进入创建球队页面时
$(document).on("pageinit", "#page_createteam", function () {
    //渲染轮次列表等数据
    new Vue({
        el: '#page_createteam',
        data: {
            roundlist: null,
            schedulelist: null,
            activatedround: null,
            CountDown: null
        },
        methods: {
            getRoundList: function () {
                var _self = this;
                callapi("WorldCup/GetRound", "", "", function (data) {
                    _self.roundlist = data.Data;

                    for (j = 0, len = _self.roundlist.length; j < len; j++) {
                        var r = _self.roundlist[j];
                        if (r.Activated) {
                            _self.activatedround = r;
                            _self.getScheduleList();
                            var timer1 = setInterval(function () {
                                _self.CountDown = ShowCountDown(new Date(_self.activatedround.strSealingTime));

                                if (_self.CountDown.lt <= 0) {
                                    clearInterval(timer1);
                                }
                            }, 1000);                         
                            break;
                        }
                    }
                });
            },
            changeActivedRound: function (item) {
                var _self = this;
                _self.activatedround = item;
                _self.getScheduleList();
                var timer1 = setInterval(function () {
                    _self.CountDown = ShowCountDown(new Date(_self.activatedround.strSealingTime));

                    if (_self.CountDown.lt <= 0) {
                        clearInterval(timer1);
                    }
                }, 1000);
            },
            getScheduleList: function () {
                var _self = this;
                $("#hidroundid").val(_self.activatedround.RoundId);
                $("#hidfreeSalary").val(_self.activatedround.SalaryCapFree);
                $("#hidmaxSalary").val(_self.activatedround.SalaryCapMax);

                var d = { roundId: _self.activatedround.RoundId };
                callapi("WorldCup/GetRoundMatch", d, "", function (data) {
                    _self.schedulelist = data.Data;
                })
            },
            writeteamname: function () {
                var s = $("#txtTeamName").val();
                if (s == "") {
                    return;
                }
                $("#hidteamname").val(s);
                window.location.href = "#page_select_player";
            }
            
        },
        compiled: function () {
            this.getRoundList();
        }
    })
});






//进入选择球员页面
$(document).on("pageshow", "#page_select_player", function () {
        //渲染轮次列表等数据
    new Vue({
        el: '#page_select_player',
        data: {
            selectedplayerlist: [],//已经选择的球员
            selectedcount: 0, //已经选择球员的数量
            teamlist: null,   //球队列表
            playerlist: null,  //球员列表
            totalsalary: 0,      //已经使用的工资帽
            activatedteam: null,  //激活的球队
            freeSalary: 9000,
            maxSalary: 12000,
            teamname: null,
            roundId: 0,
            SalaryCapRate: 1,    //身份 兑换 猜豆的比例
            CommonCardList: [],
            CommonCardEnableCount: 0,
            MyTeamId: 0
        },
        methods: {
            init: function () {
                var _self = this;
                _self.teamname = $("#hidteamname").val();
                _self.roundId = $("#hidroundid").val();

                
                _self.selectedplayerlist.splice(0, _self.selectedplayerlist.length);
                _self.selectedcount=0;
                _self.teamlist=null;
                _self.playerlist=null;
                _self.totalsalary=0;
                _self.activatedteam=null;
                _self.freeSalary = 9000;
                _self.maxSalary = 12000;
                _self.SalaryCapRate = 1;
                _self.CommonCardList = null;
                _self.CommonCardEnableCount = 0;


                var _self = this;
                _self.MyTeamId = $("#hidmyteamid").val();
                if (_self.MyTeamId > 0) {
                    var d = { myTeamId: _self.MyTeamId };
                    callapi("WorldCup/GetMyPlayer", d, "", function (data) {
                        var m = data.Data;
                        _self.roundId = m.RoundId;
                        _self.teamname = m.TeamName;

                        _self.selectedplayerlist = m.List;
                    })
                }

            },
            getRoundBase: function () {
                var _self = this;
                var d = { roundId: _self.roundId };
                callapi("WorldCup/GetRoundSalaryCap", d, "", function (data) {
                    var m = data.Data;
                    _self.freeSalary = m.SalaryCapFree;
                    _self.maxSalary = m.SalaryCapMax;
                    _self.SalaryCapRate = m.SalaryCapRate;
                    salaryBar.drawSingleSalaryBarByValue(690, 490, 0, $("#page_select_player div[name='country_player_tax'] .salaryBar")[0]);
                })
            },
            getCommonCardList: function () {
                var _self = this;
                var d = { teamId: _self.MyTeamId };
                callapi("WorldCup/GetCardCommon", d, "", function (data) {
                    _self.CommonCardList = data.Data;
                    
                })
            },
            getTeamList: function () {
                var _self = this;
                var d = { roundId: _self.roundId };
                callapi("WorldCup/GetRoundTeam", d, "", function (data) {
                    _self.teamlist = data.Data;
                    if (_self.teamlist.length > 0) {
                        _self.activatedteam = _self.teamlist[0];
                        _self.getPlayerList();
                        _self.calresult();
                    }
                })
            },
            getPlayerList: function () {
                var _self = this;
                var d = { teamId: _self.activatedteam.TeamId, myTeamId: _self.MyTeamId };
                callapi("WorldCup/GetTeamPlayer", d, "", function (data) {
                    _self.playerlist = data.Data;
                })
            },
            changeActivedTeam: function (item) {
                var _self = this;
                _self.activatedteam = item;
                _self.getPlayerList();
                _self.calresult();
            },
            selectPlayer: function (item, selectflag, carditem, commoncard) {
                //item:球员    selectflag:  -1 弹出选择   0：不用卡    carditem:卡对象   commoncard:  0专用卡   1通用卡
                var _self = this;
                if (_self.selectedcount >= 11) return;
                var playerindex = findElem(_self.selectedplayerlist, "PlayerId", item.PlayerId);
                if (playerindex > -1) {
                    return;
                }
                var css = "divcard" + item.PlayerId;
                if (selectflag == -1) {
                    var n = _self.CommonCardEnableCount;

                    if ((n + item.PlayerCardCount) > 0) {                        
                        $("div." + css).css("display", "");
                        return;
                    }
                }

                item.SelectCardId = 0;
                item.CurValue = item.Value;
                if (carditem != undefined) {
                    var playerindex = findElem(_self.playerlist, "PlayerId", item.PlayerId);
                    if (playerindex > -1) {
                        _self.playerlist[playerindex].SelectCardId = carditem.MyCardId;
                        _self.playerlist[playerindex].CurValue = parseInt(_self.playerlist[playerindex].Value * carditem.Discount);

                        item.SelectCardId = _self.playerlist[playerindex].SelectCardId;
                        item.CurValue = _self.playerlist[playerindex].CurValue;
                    }

                    if (commoncard == 1) {
                        var cardindex = findElem(_self.CommonCardList, "MyCardId", carditem.MyCardId);
                        if (cardindex > -1) {
                            _self.CommonCardList[cardindex].SelectedStatus = 1;
                        }
                    }
                }
                


                var m = {};
                m.PlayerId = item.PlayerId;
                m.TeamId = _self.activatedteam.TeamId;
                m.PlayerPicture = item.Photo;
                m.FinalValue = item.CurValue;
                m.MyCardId = item.SelectCardId;
                m.PlayerName = item.PlayerName;
                if (m.CardId > 0) {
                    m.MyCardName = carditem.CardName;
                }                
                _self.selectedplayerlist.push(m);
                $("div." + css).css("display", "none");
                _self.calresult();
            },
            removePlayer: function (item) {
                var _self = this;
                if (_self.selectedcount <= 0) return;
                var playerindex = findElem(_self.selectedplayerlist, "PlayerId", item.PlayerId);
                if (playerindex > -1) {
                    _self.selectedplayerlist.splice(playerindex, 1);

                    var playerindex1 = findElem(_self.playerlist, "PlayerId", item.PlayerId);
                    if (playerindex1 > -1) {
                        _self.playerlist[playerindex1].SelectCardId = 0;
                        _self.playerlist[playerindex1].CurValue = 0;
                    }

                    var cardindex = findElem(_self.CommonCardList, "MyCardId", item.MyCardId);
                    if (cardindex > -1) {
                        _self.CommonCardList[cardindex].SelectedStatus = 0;
                    }

                    _self.calresult();
                }

                
                
            },
            CreateMyTeam: function () {
                var _self = this;

                var playerinfo = [];
                for (j = 0; j < _self.selectedcount; j++) {
                    var m = _self.selectedplayerlist[j];
                    var m1 = {};
                    m1.PlayerId = m.PlayerId;
                    m1.MyCardId = m.MyCardId;
                    playerinfo.push(m1);
                }


                //string teamName, long roundId, string playerInfo
                var d = {
                    teamName: _self.teamname,
                    roundId: _self.roundId,
                    playerInfo: JSON.stringify(playerinfo),
                    myTeamId: _self.MyTeamId
                };

                var url = "WorldCup/CreateMyTeam";
                if (_self.MyTeamId > 0) {
                    url = "WorldCup/ChangeMyTeamPlayer";
                }

                callapi(url, d, "", function (data) {
                    window.location.href = "#page_raking";
                })
            },
            calresult: function () {
                var _self = this;
                var teamlength = _self.teamlist.length;
                for (j = 0; j < teamlength; j++) {
                    var m = _self.teamlist[j];
                    m.Count = 0;
                }

                _self.selectedcount = _self.selectedplayerlist.length;
                _self.totalsalary = 0;
                for (j = 0; j < _self.selectedcount; j++) {
                    var m = _self.selectedplayerlist[j];
                    _self.totalsalary += m.FinalValue;


                    var teamindex = findElem(_self.teamlist, "TeamId", m.TeamId);
                    if (teamindex > -1) {
                        _self.teamlist[teamindex].Count += 1;
                    }

                    //var playerindex = findElem(_self.playerlist, "PlayerId", m.PlayerId);
                    //if (playerindex > -1) {
                    //    _self.playerlist[playerindex].Count += 1;
                    //}
                }
                salaryBar.drawSingleSalaryBarByValue(690, 490, _self.totalsalary, $("#page_select_player div[name='country_player_tax'] .salaryBar")[0]);
                var playercount = _self.playerlist.length;
                for (j = 0; j < playercount; j++) {
                    var m = _self.playerlist[j];
                    

                    var index = findElem(_self.selectedplayerlist, "PlayerId", m.PlayerId);
                    if (index > -1) {
                        _self.playerlist[j].IsChoice = true;
                        _self.playerlist[j].SelectCardId = _self.selectedplayerlist[index].MyCardId;
                        _self.playerlist[j].CurValue = _self.selectedplayerlist[index].FinalValue;
                    }
                    else {
                        _self.playerlist[j].IsChoice = false;
                        _self.playerlist[j].SelectCardId = 0;
                        _self.playerlist[j].CurValue = 0;
                    }
                }


                _self.CommonCardEnableCount = findElemNum(_self.CommonCardList, "SelectedStatus", 0);

               
            }
        },
        compiled: function () {
            this.init();
            this.getCommonCardList();
            this.getRoundBase();
            this.getTeamList();
        }
    })
});


/*按照属性值，查找对象*/
function findElem(arrayToSearch, attr, val) {
    for (var i = 0; i < arrayToSearch.length; i++) {
        if (arrayToSearch[i][attr] == val) {
            return i;
        }
    }
    return -1;
}


/*按照属性值，查找对象的数量*/
function findElemNum(arrayToSearch, attr, val) {
    var n = 0;
    for (var i = 0; i < arrayToSearch.length; i++) {
        if (arrayToSearch[i][attr] == val) {
            n++;
        }
    }
    return n;
}

function ShowCountDown(endDate) {
    var now = new Date();
    var leftTime = endDate.getTime() - now.getTime();
   
    if (leftTime <= 0) {
        return { dd: 0, hh: 0, mm: 0, ss: 0,lt:0 };
    }
    var dd = parseInt(leftTime / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
    var hh = parseInt(leftTime / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
    var mm = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟数
    var ss = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
    dd = checkTime(dd);
    hh = checkTime(hh);
    mm = checkTime(mm);
    ss = checkTime(ss);//小于10的话加0

    return { dd: dd, hh: hh, mm: mm, ss: ss, lt: leftTime };
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}