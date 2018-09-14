$(document).ready(function () {
    var barwidth = 74.75;
    var barheight = 58;

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
            youhuiSalary: 0,   //优惠的工资帽
            chaochuSalary: 0,  //超过的工资帽
            NeedBonus:0,       //需要猜豆
            teamname: null,
            roundId: 0,
            SalaryCapRate: 1,    //身份 兑换 猜豆的比例
            CommonCardList: [],
            CommonCardEnableCount: 0,
            MyTeamId: 0,
            playercardlist: [],   //球员选择 球员卡的关系  PlayerId,MyCardId,MyCardName,CurValue,PlayerName
            process: {} //{ width: 0, left: 0, type: 0, css:'progresswarn',word:'' };   //type:   0:  <freelen,   1:   freelen和maxlen 之间，  2：>mexlen  word:显示的工资帽
        },
        methods: {
            init: function () {
                var _self = this;
                _self.teamname = getUrlParam("teamname");
                _self.roundId = getUrlParam("roundid");


                _self.selectedplayerlist.splice(0, _self.selectedplayerlist.length);
                _self.selectedcount = 0;
                _self.teamlist = null;
                _self.playerlist = null;
                _self.totalsalary = 0;
                _self.activatedteam = null;
                _self.freeSalary = 9000;
                _self.maxSalary = 12000;
                _self.SalaryCapRate = 1;
                _self.CommonCardList = null;
                _self.CommonCardEnableCount = 0;


                var _self = this;
                _self.MyTeamId = getUrlParam("myteamid");
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

                $('div.player_list').scrollTop(0);
            },
            selectCard: function (item, selectflag, carditem, commoncard) {
                //item:球员    selectflag:  -1 弹出选择   0：不用卡    carditem:卡对象   commoncard:  0专用卡   1通用卡
                var _self = this;
                var playerindex = findElem(_self.playerlist, "PlayerId", item.PlayerId);
                if (playerindex == -1) {
                    return;
                }

                var css = "divcard" + item.PlayerId;
                //弹出
                if (selectflag == -1) {
                    var divdisplay = $("div." + css).css("display");
                    if (divdisplay == "none") {
                        $("div." + css).css("display", "");
                    }
                    else {
                        $("div." + css).css("display", "none");
                    }
                    return;
                }

                var selectcardid = item.SelectCardId;

                if (carditem == undefined) {
                    if (selectcardid == 0) {
                        $("div." + css).css("display", "none");
                        return;
                    }
                }
                else {
                    if (selectcardid == carditem.MyCardId) {
                        $("div." + css).css("display", "none");
                        return;
                    }
                }

                //设置选中的通用卡为可用
                var selectcomcardindex = findElem(_self.CommonCardList, "MyCardId", selectcardid);
                if (selectcomcardindex > -1) {
                    _self.CommonCardList[selectcomcardindex].SelectedStatus = 0;
                }

               

                var playercardindex = findElem(_self.playercardlist, "PlayerId", item.PlayerId);
                if (playercardindex >-1) {
                    _self.playercardlist.splice(playercardindex, 1);
                }

                //不用卡
                if (carditem == undefined) {
                    _self.playerlist[playerindex].SelectCardId = 0;
                    _self.playerlist[playerindex].CurValue = parseInt(_self.playerlist[playerindex].Value);
                    _self.playerlist[playerindex].CardName = "";

                    
                }
                else {
                    _self.playerlist[playerindex].SelectCardId = carditem.MyCardId;
                    _self.playerlist[playerindex].CurValue = parseInt(_self.playerlist[playerindex].Value * carditem.Discount);
                    _self.playerlist[playerindex].CardName = carditem.CardName;

                    var m = {};
                    m.PlayerId = item.PlayerId;
                    m.MyCardId = carditem.MyCardId;
                    m.PlayerName = item.PlayerName;
                    m.MyCardName = carditem.CardName;
                    m.CurValue = _self.playerlist[playerindex].CurValue;
                    _self.playercardlist.push(m);

                     


                      if (commoncard == 1) {
                        var cardindex = findElem(_self.CommonCardList, "MyCardId", carditem.MyCardId);
                        if (cardindex > -1) {
                            _self.CommonCardList[cardindex].SelectedStatus = 1;
                        }
                    }
                }

                var selectedplayerindex = findElem(_self.selectedplayerlist, "PlayerId", item.PlayerId);
                if (selectedplayerindex > -1) {
                    _self.selectedplayerlist[selectedplayerindex].MyCardId = _self.playerlist[playerindex].SelectCardId;
                    _self.selectedplayerlist[selectedplayerindex].FinalValue = _self.playerlist[playerindex].CurValue;
                    _self.selectedplayerlist[selectedplayerindex].MyCardName = _self.playerlist[playerindex].CardName;

                    
                }

                _self.calresult();
                $("div." + css).css("display", "none");
            },
            selectPlayer: function (item, selectflag, carditem, commoncard) {
                //item:球员    selectflag:  -1 弹出选择   0：不用卡    carditem:卡对象   commoncard:  0专用卡   1通用卡
                var _self = this;
                if (_self.selectedcount >= 11) {
                    messagebox("boxcannotselect");
                    return;
                }
                var playerindex = findElem(_self.selectedplayerlist, "PlayerId", item.PlayerId);
                if (playerindex > -1) {
                    return;
                }

                var m = {};
                m.PlayerId = item.PlayerId;
                m.TeamId = _self.activatedteam.TeamId;
                m.PlayerPicture = item.Photo;
                m.PlayerValue = item.Value;
                m.FinalValue = item.Value;
                m.MyCardId = item.SelectCardId;
                m.PlayerName = item.PlayerName;
                m.MyCardName = "";
                if (item.SelectCardId > 0) {
                    m.MyCardName = item.CardName;
                    m.FinalValue = item.CurValue;
                }
                _self.selectedplayerlist.push(m);
                _self.calresult();
            },
            removePlayer: function (item) {
                var _self = this;
                if (_self.selectedcount <= 0) return;
                var playerindex = findElem(_self.selectedplayerlist, "PlayerId", item.PlayerId);
                if (playerindex > -1) {
                    _self.selectedplayerlist.splice(playerindex, 1);

                    //var playerindex1 = findElem(_self.playerlist, "PlayerId", item.PlayerId);
                    //if (playerindex1 > -1) {
                    //    _self.playerlist[playerindex1].SelectCardId = 0;
                    //    _self.playerlist[playerindex1].CurValue = 0;
                    //}

                    //var cardindex = findElem(_self.CommonCardList, "MyCardId", item.MyCardId);
                    //if (cardindex > -1) {
                    //    _self.CommonCardList[cardindex].SelectedStatus = 0;
                    //}

                    _self.calresult();
                }



            },
            infoalert: function () {
                var _self = this;
                if (_self.selectedcount != 11) {
                    messagebox("boxcannotnext");
                    return;
                };
                if (_self.totalsalary > _self.maxSalary) {
                    messagebox("boxchanchualert");
                    return;
                }

                //if (_self.NeedBonus > 0) {
                //    messagebox("boxnext", function () {
                //        messagebox("teaminfo", function () {
                //            _self.CreateMyTeam();
                //        });
                //    });
                //    return;
                //}

                messagebox("teaminfo", function () {

                    if (_self.NeedBonus <= 0) {
                        _self.CreateMyTeam();
                        return;
                    }

                    messagebox("boxnext", function () {
                        _self.CreateMyTeam();
                    });
                });
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
                    messagebox("boxok");
                }, function (data) {
                    if (data.Message == "余额不足") {
                        messagebox("boxmoneyless");
                    }
                    else {
                        MessageAlert(data.Message);
                    }
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
                _self.youhuiSalary = 0;

                
                for (j = 0; j < _self.selectedcount; j++) {
                    var m = _self.selectedplayerlist[j];
                    _self.totalsalary += m.FinalValue;

                    if (m.MyCardId > 0) {
                        var y = parseInt(m.PlayerValue - m.FinalValue);
                        _self.youhuiSalary += y;
                    }

                    var teamindex = findElem(_self.teamlist, "TeamId", m.TeamId);
                    if (teamindex > -1) {
                        _self.teamlist[teamindex].Count += 1;
                    }

                    //var playerindex = findElem(_self.playerlist, "PlayerId", m.PlayerId);
                    //if (playerindex > -1) {
                    //    _self.playerlist[playerindex].Count += 1;
                    //}
                }

                
                _self.chaochuSalary = _self.totalsalary - _self.freeSalary;
                if (_self.chaochuSalary < 0) _self.chaochuSalary = 0;
                _self.NeedBonus = parseInt(_self.chaochuSalary*10000 / _self.SalaryCapRate);

                _self.process = calprogress(_self.totalsalary, _self.maxSalary, _self.freeSalary);
                var playercount = _self.playerlist.length;
                for (j = 0; j < playercount; j++) {
                    var m = _self.playerlist[j];


                    var index = findElem(_self.selectedplayerlist, "PlayerId", m.PlayerId);
                    if (index > -1) {
                        _self.playerlist[j].IsChoice = true;
                        _self.playerlist[j].CurValue = _self.selectedplayerlist[index].FinalValue;
                        _self.playerlist[j].CardName = _self.selectedplayerlist[index].MyCardName;
                    }
                    else {
                        _self.playerlist[j].IsChoice = false;
                        _self.playerlist[j].CurValue = 0;
                        _self.playerlist[j].CardName = "";
                    }

                    //playercardlist: []   //球员选择 球员卡的关系  PlayerId,MyCardId,MyCardName,CurValue,PlayerName

                    var playercardindex = findElem(_self.playercardlist, "PlayerId", m.PlayerId);
                    if (playercardindex > -1) {
                        _self.playerlist[j].SelectCardId = _self.playercardlist[playercardindex].MyCardId;
                        _self.playerlist[j].CurValue = _self.playercardlist[playercardindex].CurValue;
                        _self.playerlist[j].CardName = _self.playercardlist[playercardindex].MyCardName;
                    }
                    else {
                        _self.playerlist[j].SelectCardId = 0;
                        _self.playerlist[j].CurValue = 0;
                        _self.playerlist[j].CardName = "";
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