$(function () {
    var teamId = getUrlParam("id");
    new Vue({
        el: '#page_teamdetails',
        data: {
            team: null,
            process: {} //{ width: 0, left: 0, type: 0, css:'progresswarn',word:'' };   //type:   0:  <freelen,   1:   freelen和maxlen 之间，  2：>mexlen  word:显示的工资帽
        },
        methods: {
            //获取球队详情
            getTeamDetails: function () {
                var _self = this;
                callapi("WorldCup/GetMyWorldCupTeamDetail", { teamId: teamId }, "", function (data) {
                    _self.team = data.Data;
                    _self.process = calprogress(_self.team.FinalTotalValue, _self.team.SalaryCapMax, _self.team.SalaryCapFree);
                });
            },
            //解散球队
            disbandTeam: function (teamId) {
                var _self = this;

                messagebox("boxnext", function () {
                    callapi("WorldCup/DisbandMyTeam", { myTeamId: teamId }, "", function (data) {
                        //解散成功，列表中移除元素
                        messagebox("boxok", function () {
                            gotourl("myteam.html");
                        });
                    });
                });
            }
        },
        compiled: function () {
            this.getTeamDetails();
        }
    })
});