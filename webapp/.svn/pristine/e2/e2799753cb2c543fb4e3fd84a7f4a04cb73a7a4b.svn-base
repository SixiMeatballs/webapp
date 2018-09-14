$(function () {
    new Vue({
        el: '#page_myteam',
        data: {
            teamlist: null,
        },
        methods: {
            //获取球队列表
            getTeamList: function () {
                var _self = this;
                callapi("WorldCup/GetMyWorldCupTeam", "", "", function (data) {
                    _self.teamlist = data.Data;
                    for (var i = 0; i < _self.teamlist.length; i++) {
                        _self.teamlist[i].process = calprogress(_self.teamlist[i].FinalTotalValue, _self.teamlist[i].SalaryCapMax, _self.teamlist[i].SalaryCapFree);
                    }
                });
            },
            //解散球队
            disbandTeam: function (teamId) {
                var _self = this;

                messagebox("boxnext", function () {
                    _teamlist = _self.teamlist;
                    _teamlist.forEach(function (item, index) {
                        if (item.TeamId == teamId) {
                            callapi("WorldCup/DisbandMyTeam", { myTeamId: teamId }, "", function (data) {
                                //解散成功，列表中移除元素
                                messagebox("boxok");
                                _teamlist.splice(index, 1);
                            });
                        }
                    })
                });
            }
        },
        compiled: function () {
            this.getTeamList();
        }
    })
});